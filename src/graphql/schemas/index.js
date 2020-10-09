const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${require("./user")}
  ${require("./post")}
  ${require("./comment")}
`;

module.exports = typeDefs;
