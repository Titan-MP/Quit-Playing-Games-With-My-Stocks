import { gql } from "@apollo/client";

/**
 * A GraphQL mutation to login a user.
 *
 * @typedef {Object} LOGIN_USER
 * @property {string} LOGIN_USER.token - The token generated for the user.
 * @property {Object} LOGIN_USER.user - The user object containing the username, password, and _id.
 * @property {string} LOGIN_USER.user.username - The username of the user.
 * @property {string} LOGIN_USER.user.password - The password of the user.
 * @property {string} LOGIN_USER.user._id - The unique identifier of the user.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 *
 * @returns {Object} - The token and user object of the logged in user.
 */
export const LOGIN_USER = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				username
				password
				_id
			}
		}
	}
`;

/**
 * Mutation to add a new user to the database.
 *
 * @typedef {Object} User - The user object returned by the mutation.
 * @property {string} _id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 *
 * @typedef {Object} AddUserResponse - The response object returned by the mutation.
 * @property {string} token - The authentication token for the user.
 * @property {User} user - The user object.
 *
 * @param {string} $username - The username of the new user.
 * @param {string} $password - The password of the new user.
 * @param {number} $initialFunding - The initial funding amount for the new user.
 * @returns {AddUserResponse} The response object containing the authentication token and user object.
 */
export const ADD_USER = gql`
	mutation addUser(
		$username: String!
		$password: String!
		$initialFunding: Int!
	) {
		addUser(
			username: $username
			password: $password
			initialFunding: $initialFunding
		) {
			token
			user {
				_id
				username
			}
		}
	}
`;

/**
 * Mutation to add a new position for a user
 * @typedef {Object} Position
 * @property {string} _id - The unique identifier for the position
 * @property {Object} stock - The stock associated with the position
 * @property {string} stock._id - The unique identifier for the stock
 * @property {string} stock.ticker - The ticker symbol for the stock
 * @property {number} price - The price at which the position was purchased
 * @property {number} quantity - The quantity of shares purchased
 * @property {Object} user - The user who owns the position
 * @property {string} user._id - The unique identifier for the user
 * @property {string} user.username - The username of the user
 */
export const ADD_POSITION = gql`
	mutation addPosition($stock: ID!, $price: Float!, $quantity: Int!) {
		addPosition(stock: $stock, price: $price, quantity: $quantity) {
			_id
			stock {
				_id
				ticker
			}
			price
			quantity
			user {
				_id
				username
			}
		}
	}
`;

/**
 * Mutation to add a stock to the database.
 * @param {string} ticker - The ticker symbol of the stock to add.
 * @returns {object} - The _id and ticker of the added stock.
 */
export const ADD_STOCK = gql`
	mutation ADD_STOCK($symbol: String!, $name: String!) {
		addStock(symbol: $symbol, name: $name) {
			_id
			symbol
			name
		}
	}
`;

/**
 * Mutation to add a new watchlist for a user
 * @param {string} user - The ID of the user adding the watchlist
 * @param {string} name - The name of the watchlist being added
 * @returns {object} - The ID and name of the newly added watchlist
 */
export const ADD_WATCHLIST = gql`
	mutation ADD_WATCHLIST($user: ID!, $name: String!) {
		addWatchlist(user: $user, name: $name) {
			_id
			name
		}
	}
`;

/**
 * Removes a position from the database.
 * @param {string} positionId - The ID of the position to be removed.
 * @returns {object} - The removed position object containing _id, stock, price, quantity, and user fields.
 */
export const REMOVE_POSITION = gql`
	mutation removePosition($positionId: ID!) {
		removePosition(positionId: $positionId) {
			_id
			stock {
				_id
				ticker
			}
			price
			quantity
			user {
				_id
				username
			}
		}
	}
`;

/**
 * Removes a stock from the database.
 * @mutation
 * @param {string} $stockId - The ID of the stock to be removed.
 * @returns {Object} The removed stock's ID and ticker.
 */
export const REMOVE_STOCK = gql`
	mutation removeStock($stockId: ID!) {
		removeStock(stockId: $stockId) {
			_id
			ticker
		}
	}
`;

/**
 * Removes a watchlist from the database.
 *
 * @param {string} watchlistId - The ID of the watchlist to be removed.
 * @returns {Object} The removed watchlist's ID and name.
 */
export const REMOVE_WATCHLIST = gql`
	mutation removeWatchlist($watchlistId: ID!) {
		removeWatchlist(watchlistId: $watchlistId) {
			_id
			name
		}
	}
`;

/**
 * Mutation to add a stock to a watchlist
 * @param {string} watchlistId - The ID of the watchlist to add the stock to
 * @param {string} stockId - The ID of the stock to add to the watchlist
 * @returns {object} - The updated watchlist object with the added stock
 */
export const ADD_STOCK_TO_WATCHLIST = gql`
	mutation addStockToWatchlist($watchlistId: ID!, $stockId: ID!) {
		addStockToWatchlist(watchlistId: $watchlistId, stockId: $stockId) {
			_id
			name
			stocks {
				_id
			}
		}
	}
`;

/**
 * Removes a stock from a watchlist.
 *
 * @mutation
 * @typedef {Object} Mutation
 * @property {string} _id - The ID of the watchlist.
 * @property {string} name - The name of the watchlist.
 * @property {Object[]} stocks - The list of stocks in the watchlist.
 * @property {string} stocks._id - The ID of the stock.
 * @property {string} stocks.ticker - The ticker symbol of the stock.
 *
 * @param {string} watchlistId - The ID of the watchlist to remove the stock from.
 * @param {string} stockId - The ID of the stock to remove from the watchlist.
 *
 * @returns {Mutation} The updated watchlist after removing the stock.
 */
export const REMOVE_STOCK_FROM_WATCHLIST = gql`
	mutation removeStockFromWatchlist($watchlistId: ID!, $stockId: ID!) {
		removeStockFromWatchlist(watchlistId: $watchlistId, stockId: $stockId) {
			_id
			name
			stocks {
				_id
			}
		}
	}
`;

/**
 * Mutation to update a position in the database.
 * @typedef {Object} Position - The position object to be updated.
 * @property {string} _id - The ID of the position.
 * @property {Object} stock - The stock object associated with the position.
 * @property {string} stock._id - The ID of the stock.
 * @property {string} stock.ticker - The ticker symbol of the stock.
 * @property {number} price - The updated price of the position.
 * @property {number} quantity - The updated quantity of the position.
 * @property {Object} user - The user object associated with the position.
 * @property {string} user._id - The ID of the user.
 * @property {string} user.username - The username of the user.
 */
export const UPDATE_POSITION = gql`
	mutation updatePosition($positionId: ID!, $price: Float!, $quantity: Int!) {
		updatePosition(
			positionId: $positionId
			price: $price
			quantity: $quantity
		) {
			_id
			stock {
				_id
				ticker
			}
			price
			quantity
			user {
				_id
				username
			}
		}
	}
`;

/**
 * Mutation to update a stock's ticker by its ID.
 * @mutation
 * @typedef {Object} UPDATE_STOCK
 * @property {string} UPDATE_STOCK - The GraphQL mutation query.
 * @property {string} UPDATE_STOCK.stockId - The ID of the stock to update.
 * @property {string} UPDATE_STOCK.ticker - The new ticker symbol for the stock.
 * @property {string} UPDATE_STOCK._id - The ID of the updated stock.
 * @property {string} UPDATE_STOCK.ticker - The new ticker symbol of the updated stock.
 */
export const UPDATE_STOCK = gql`
	mutation updateStock($stockId: ID!, $ticker: String!) {
		updateStock(stockId: $stockId, ticker: $ticker) {
			_id
			ticker
		}
	}
`;

/**
 * Mutation to update a watchlist's name
 * @typedef {Object} gql
 * @property {function} gql - A function that parses a GraphQL query string into a query document.
 * @param {string} watchlistId - The ID of the watchlist to update
 * @param {string} name - The new name for the watchlist
 * @returns {Object} - The updated watchlist object with its ID and name
 */
export const UPDATE_WATCHLIST = gql`
	mutation updateWatchlist($watchlistId: ID!, $name: String!) {
		updateWatchlist(watchlistId: $watchlistId, name: $name) {
			_id
			name
		}
	}
`;

/**
 * Mutation to update user's amount.
 * @typedef {Object} gql
 * @property {function} gql - A function that parses GraphQL query strings into the standard GraphQL AST.
 * @returns {Object} - The updated user object with _id, username, and amount fields.
 */
export const UPDATE_USER = gql`
	mutation updateUser($amount: Int!) {
		updateUser(amount: $amount) {
			_id
			username
			amount
		}
	}
`;

/**
 * Mutation to update user password.
 * @typedef {Object} MutationUpdateUserPassword
 * @property {string} _id - The ID of the user.
 * @property {string} username - The username of the user.
 * @property {number} amount - The amount of money the user has.
 */
export const UPDATE_USER_PASSWORD = gql`
	mutation updateUserPassword($password: String!) {
		updateUserPassword(password: $password) {
			_id
			username
			amount
		}
	}
`;

/**
 * Mutation to update user's username
 * @typedef {Object} MutationUpdateUserUsername
 * @property {string} _id - The ID of the updated user
 * @property {string} username - The new username of the updated user
 * @property {number} amount - The amount of money the updated user has
 */
export const UPDATE_USER_USERNAME = gql`
	mutation updateUserUsername($username: String!) {
		updateUserUsername(username: $username) {
			_id
			username
			amount
		}
	}
`;

/**
 * Mutation to update user watchlists
 * @mutation
 * @typedef {Object} UPDATE_USER_WATCHLISTS
 * @property {function} updateUserWatchlists - Function to update user watchlists
 * @property {string} _id - User ID
 * @property {string} username - User's username
 * @property {number} amount - User's amount
 * @property {Array} watchlists - Array of user's watchlists
 * @property {string} watchlists._id - Watchlist ID
 * @property {string} watchlists.name - Watchlist name
 */
export const UPDATE_USER_WATCHLISTS = gql`
	mutation updateUserWatchlists($userId: ID!, $watchlists: [ID]!) {
		updateUserWatchlists(userId: $userId, watchlists: $watchlists) {
			_id
			username
			amount
			watchlists {
				_id
				name
			}
		}
	}
`;

/**
 * Mutation to update the stocks in a watchlist.
 * @typedef {Object} WatchlistStocks
 * @property {string} _id - The ID of the watchlist.
 * @property {string} name - The name of the watchlist.
 * @property {Array.<Object>} stocks - The array of stocks in the watchlist.
 * @property {string} stocks._id - The ID of the stock.
 * @property {string} stocks.ticker - The ticker symbol of the stock.
 */
export const UPDATE_WATCHLIST_STOCKS = gql`
	mutation updateWatchlistStocks($watchlistId: ID!, $stocks: [ID]!) {
		updateWatchlistStocks(watchlistId: $watchlistId, stocks: $stocks) {
			_id
			name
			stocks {
				_id
				ticker
			}
		}
	}
`;

/**
 * Mutation to add a watchlist to a user.
 * @mutation
 * @typedef {Object} ADD_WATCHLIST_TO_USER
 * @property {string} userId - The ID of the user.
 * @property {string} watchlistId - The ID of the watchlist to be added.
 * @returns {Object} - The ID of the user.
 */
export const ADD_WATCHLIST_TO_USER = gql`
	mutation ADD_WATCHLIST_TO_USER($userId: ID!, $watchlistId: ID!) {
		addWatchlistToUser(userId: $userId, watchlistId: $watchlistId) {
			_id
		}
	}
`;
