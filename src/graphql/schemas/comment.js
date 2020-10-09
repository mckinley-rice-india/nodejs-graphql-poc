const { gql } = require('apollo-server');

module.exports = gql`
  extend type Query {
    comments(postId: ID!): [Comment!]
    comment(id: ID!): Comment
  }

  extend type Mutation {
    createComment(comment: String!, postId: ID!): Comment!
  }

  type Comment {
    id: ID!
    comment: String!
    post: Post!
    user: User!
  }
`;
