const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    amount: Int!
    stocks: [Stock]!
  }

  type Stock {
    _id: ID!
    symbol: String!
    name: String!
    price: Int!
    quantity: Int!
    user: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    stocks: [Stock]
    users: [User]
    stock(_id: ID!): Stock
    user(_id: ID!): User

    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!, amount: Int!): Auth
    login(username: String!, password: String!): Auth
    addStock(symbol: String!, name: String!, price: Int!, quantity: Int!): Stock
    removeStock(_id: ID!): Stock
    removeUser(_id: ID!): User
  }
  `;
  
  module.exports = typeDefs;
  
  // updateStock(_id: ID!, quantity: Int!): Stock
  // updateAmount(_id: ID!, amount: Int!): User