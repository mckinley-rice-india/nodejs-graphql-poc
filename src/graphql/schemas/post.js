const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    posts(userId: ID): [Post!]
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(body: String!): Post!
  }

  type Post {
    id: ID!
    body: String!
    user: User!
    comments: [Comment!]
  }
`;
