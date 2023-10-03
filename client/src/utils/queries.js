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
                stock {
                    _id
                    ticker
                }
                price
                quantity
            }
        }
    }
`;


/**
 * A GraphQL query to retrieve a user's watchlist.
 *
 * @typedef {Object} QUERY_USER_WATCHLIST
 * @property {Object} user - The user object.
 * @property {Array} user.watchlist - The user's watchlist.
 * @property {string} user.watchlist._id - The ID of the watchlist item.
 * @property {Object} user.watchlist.stock - The stock object.
 * @property {string} user.watchlist.stock._id - The ID of the stock.
 * @property {string} user.watchlist.stock.ticker - The ticker symbol of the stock.
 */
export const QUERY_USER_WATCHLIST = gql`
    query User($username: String!) {
        user(username: $username) {
            watchlist {
                _id
                stock {
                    _id
                    ticker
                }
            }
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
