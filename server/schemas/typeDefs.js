const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    amount: Int!
    stocks: [Stock]
  }

  type Stock {
    _id: ID!
    symbol: String!
    name: String!
    price: Int!
    quantity: Int!
    user: [User]
  }

  type Query {
    stock: [Stock]
    user: [User]
    stock(_id: ID!): Stock
    user(_id: ID!): User
  }

  type Mutation {
    addStock(symbol: String!, name: String!, price: Int!, quantity: Int!): Stock
    addUser(username: String!, password: String!, amount: Int!): User
    updateStock(_id: ID!, quantity: Int!): Stock
    updateAmount(_id: ID!, amount: Int!): User
    removeStock(_id: ID!): Stock
    removeUser(_id: ID!): User
  }
`;

module.exports = typeDefs;
