import { gql } from "@apollo/client";

// Query user net liquidation
export const QUERY_NET_LIQUIDATION = gql`
	query User($username: String!) {
		user(username: $username) {
			netLiquidation
		}
	}
`;

// Query user positions
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

// Query user watchlist
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

// Query user initial funding
export const QUERY_USER_INITIAL_FUNDING = gql`
    query User($username: String!) {
        user(username: $username) {
            initialFunding
        }
    }
`;

