import { gql } from "@apollo/client";

/**
 * A GraphQL query to get the net liquidation of a user.
 *
 * @typedef {Object} QUERY_NET_LIQUIDATION
 * @property {Function} query - The GraphQL query function.
 * @property {Object} variables - The variables required for the query.
 * @property {string} variables.username - The username of the user to get the net liquidation for.
 * @property {Object} data - The data returned from the query.
 * @property {Object} data.user - The user object returned from the query.
 * @property {number} data.user.netLiquidation - The net liquidation of the user.
 */
export const QUERY_NET_LIQUIDATION = gql`
	query User($username: String!) {
		user(username: $username) {
			netLiquidation
		}
	}
`;

/**
 * GraphQL query to get a user's positions.
 *
 * @typedef {Object} UserPositions
 * @property {string} _id - The ID of the position.
 * @property {Object} stock - The stock object associated with the position.
 * @property {string} stock._id - The ID of the stock.
 * @property {string} stock.ticker - The ticker symbol of the stock.
 * @property {number} price - The price at which the position was purchased.
 * @property {number} quantity - The quantity of shares held in the position.
 *
 * @typedef {Object} User
 * @property {UserPositions[]} positions - An array of positions held by the user.
 *
 * @param {string} username - The username of the user to query.
 * @returns {User} The user object containing their positions.
 */
export const QUERY_USER_POSITIONS = gql`
	query User($username: String!) {
		user(username: $username) {
			positions {
				_id
				symbol {
					_id
					symbol
					name
				}
				price
				quantity
			}
		}
	}
`;

/**
 * A GraphQL query to retrieve watchlists for a specific user.
 *
 * @typedef {Object} Watchlist
 * @property {string} _id - The unique identifier of the watchlist.
 * @property {string} name - The name of the watchlist.
 *
 * @param {string} user - The ID of the user to retrieve watchlists for.
 * @returns {Object} The watchlists for the specified user.
 */
export const QUERY_USER_WATCHLIST = gql`
	query QUERY_USER_WATCHLISTS($user: ID!) {
		watchlists(user: $user) {
			_id
			name
		}
	}
`;

/**
 * A GraphQL query to get the initial funding of a user.
 *
 * @typedef {Object} QUERY_USER_INITIAL_FUNDING
 * @property {String} username - The username of the user to get the initial funding for.
 * @property {Number} initialFunding - The initial funding of the user.
 */
export const QUERY_USER_INITIAL_FUNDING = gql`
	query User($username: String!) {
		user(username: $username) {
			initialFunding
		}
	}
`;

/**
 * A GraphQL query to retrieve the stocks in a user's watchlist.
 *
 * @typedef {Object} QUERY_WATCHLIST_STOCKS
 * @property {string} id - The ID of the user's watchlist.
 * @property {Object[]} watchlist - The user's watchlist.
 * @property {Object[]} watchlist.stocks - The stocks in the user's watchlist.
 * @property {string} watchlist.stocks._id - The ID of the stock.
 */
export const QUERY_WATCHLIST_STOCKS = gql`
	query QUERY_WATCHLIST_STOCKS($id: ID!) {
		watchlist(_id: $id) {
			stocks {
				_id
			}
		}
	}
`;

/**
 * A GraphQL query to get the symbol of a stock by its ID.
 *
 * @typedef {Object} QUERY_STOCK
 * @property {string} QUERY_STOCK.symbol - The symbol of the stock.
 *
 * @param {string} id - The ID of the stock to query.
 * @returns {Object} The result of the GraphQL query.
 */
export const QUERY_STOCK = gql`
	query QUERY_STOCK($id: ID!) {
		stock(_id: $id) {
			symbol
		}
	}
`;

/**
 * A GraphQL query to fetch all stocks from the server.
 *
 * @typedef {Object} QUERY_STOCKS
 * @property {Array} stocks - An array of stock objects containing their _id, symbol, and name.
 */
export const QUERY_STOCKS = gql`
	query QUERY_STOCKS {
		stocks {
			_id
			symbol
			name
		}
	}
`;
