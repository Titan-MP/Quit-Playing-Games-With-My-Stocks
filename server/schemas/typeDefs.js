const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        stockCount: Int
        stockDatas: [String!]
    }

    type Stock {
        _id: ID!
        stockname: String!
        price: Int
        priceChanged: Int
    }

    type Auth {
        token : ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addStock(
            stockname: String!
            price: Int
            priceChanged: Int
        ):User
        saveStock(price: Int):User
        removeStock(userId: ID!, stockId: ID!): User
    }
`;

module.exports = typeDefs;