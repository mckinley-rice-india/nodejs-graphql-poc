const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./auth');
const {
  validator,
  schemas: { postSchema },
} = require('../../validations');

const Query = {
  posts: combineResolvers(
    isAuthenticated,
    async (parent, { userId }, { models, secret }) => {
      const filter = {};
      if (userId) filter.userId = userId;
      return await models.Post.find(filter);
    },
  ),
  post: combineResolvers(
    isAuthenticated,
    async (parent, { id }, { models, secret }) =>
      await models.Post.findById(id),
  ),
};

const Mutation = {
  createPost: combineResolvers(
    isAuthenticated,
    async (parent, args, { models, user }) => {
      validator(postSchema, args);
      return await models.Post.create({
        ...args,
        userId: user.id,
      });
    },
  ),
};

const Post = {
  user: async (post, args, { models, user }) =>
    await models.User.findById(post.userId),
  comments: async (post, args, { models, user }) =>
    await models.Comment.find({ postId: post.id }),
};

module.exports = { Query, Mutation, Post };
