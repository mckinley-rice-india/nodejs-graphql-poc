const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./auth');
const {
  validator,
  schemas: { commentSchema },
} = require('../../validations');

const Query = {
  comments: combineResolvers(
    isAuthenticated,
    async (parent, { postId }, { models, secret }) =>
      await models.Comment.find({ postId }),
  ),
  comment: combineResolvers(
    isAuthenticated,
    async (parent, { id }, { models, secret }) =>
      await models.Comment.findById(id),
  ),
};

const Mutation = {
  createComment: combineResolvers(
    isAuthenticated,
    async (parent, args, { models, user }) => {
      validator(commentSchema, args);
      return await models.Comment.create({
        ...args,
        userId: user.id,
      });
    },
  ),
};

const Comment = {
  post: async (comment, args, { models, user }) =>
    await models.Post.findById(comment.postId),
  user: async (comment, args, { models, user }) =>
    await models.User.findById(comment.userId),
};

module.exports = { Query, Mutation, Comment };
