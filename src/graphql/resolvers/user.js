const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server');
const {
  validator,
  schemas: { userSchema },
} = require('../../validations');

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

const Query = {
  users: async (parent, args, { models }) => await models.User.find(),
  user: async (parent, { id }, { models }) =>
    await models.User.findById(id),
  me: async (parent, args, { models, user }) =>
    user ? await models.User.findById(user.id) : null,
};

const Mutation = {
  signUp: async (parent, args, { models, secret }) => {
    validator(userSchema, args);
    const user = await models.User.create(args);
    const token = createToken(user, secret, '30 days');
    return { token, user };
  },

  signIn: async (parent, args, { models, secret }) => {
    validator(userSchema, args);
    const user = await models.User.findOne({ email: args.email });
    if (!user)
      throw new UserInputError(
        'No user found with this login credentials.',
      );

    const isValid = await user.validatePassword(args.password);
    if (!isValid) throw new AuthenticationError('Invalid password.');

    const token = createToken(user, secret, '30m');
    return { token, user };
  },
};

User = {
  posts: async (user, args, { models }) =>
    await models.Post.find({
      userId: user.id,
    }),
};

module.exports = { Query, Mutation, User };
