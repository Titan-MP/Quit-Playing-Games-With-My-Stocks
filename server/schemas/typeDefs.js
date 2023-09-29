const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    amount: String
    stocks: [Stock]!
  }

  type Stock {
    _id: ID!
    symbol: String
    name: String
    price: Int
    quantity: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addStock(symbol: String!, name: String!, price: Int!, quantity: Int!): Stock
    addUser(username: String!, password: String!): Auth
    updateStock(_id: ID!, quantity: Int!): Stock
    updateAmount(_id: ID!, amount: String!): User
    removeStock(_id: ID!): Stock
    removeUser(_id: ID!): User
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
