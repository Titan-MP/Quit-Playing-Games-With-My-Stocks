const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Position {
		_id: ID!
		stock: Stock!
		price: Float!
		quantity: Int!
		user: User!
	}

	type Stock {
		_id: ID!
		symbol: String!
		name: String!
	}

	type User {
		_id: ID!
		username: String!
		password: String!
		initialFunding: Int!
		netLiquidation: Int!
		positions: [Position]
		watchlists: [Watchlist]
	}

	type Watchlist {
		_id: ID!
		name: String!
		user: User!
		stocks: [Stock]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		positions(user: ID!): [Position]
		position(_id: ID!): Position
		stocks: [Stock]
		stock(_id: ID!): Stock
		users: [User]
		user(username: String!): User
		watchlists(user: ID!): [Watchlist]
		watchlist(_id: ID!): Watchlist
		me: User
	}

	type Mutation {
		addPosition(
			user: ID!
			stock: ID!
			price: Float!
			quantity: Int!
		): Position
		addStock(symbol: String!, name: String!): Stock
		addUser(
			username: String!
			password: String!
			initialFunding: Int!
		): Auth
		addWatchlist(user: ID!, name: String!): Watchlist
		addWatchlistToUser(userId: ID!, watchlistId: ID!): User
		addStockToWatchlist(watchlistId: ID!, stockId: ID!): Watchlist
		login(username: String!, password: String!): Auth
		removePosition(_id: ID!): Position
		removeStock(_id: ID!): Stock
		removeUser(_id: ID!): User
		removeWatchlist(_id: ID!): Watchlist
		removeStockFromWatchlist(_id: ID!): Watchlist
		updatePosition(_id: ID!, quantity: Int!): Position
		updateStock(_id: ID!, quantity: Int!): Stock
		updateUser(_id: ID!): User
		updateWatchlist(_id: ID!): Watchlist
	}
`;

module.exports = typeDefs;
