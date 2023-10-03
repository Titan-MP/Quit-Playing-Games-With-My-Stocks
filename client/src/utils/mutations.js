import { gql } from "@apollo/client";

// Login a user
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

// Create a new user
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

// Add a new position
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

// Add a new stock
export const ADD_STOCK = gql`
	mutation addStock($ticker: String!) {
		addStock(ticker: $ticker) {
			_id
			ticker
		}
	}
`;

// Add a new watchlist
export const ADD_WATCHLIST = gql`
	mutation addWatchlist($name: String!) {
		addWatchlist(name: $name) {
			_id
			name
		}
	}
`;

// Remove a position
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

// Remove a stock
export const REMOVE_STOCK = gql`
	mutation removeStock($stockId: ID!) {
		removeStock(stockId: $stockId) {
			_id
			ticker
		}
	}
`;

// Remove a watchlist
export const REMOVE_WATCHLIST = gql`
	mutation removeWatchlist($watchlistId: ID!) {
		removeWatchlist(watchlistId: $watchlistId) {
			_id
			name
		}
	}
`;

// Add a stock to a watchlist
export const ADD_STOCK_TO_WATCHLIST = gql`
	mutation addStockToWatchlist($watchlistId: ID!, $stockId: ID!) {
		addStockToWatchlist(watchlistId: $watchlistId, stockId: $stockId) {
			_id
			name
			stocks {
				_id
				ticker
			}
		}
	}
`;

// Remove a stock from a watchlist
export const REMOVE_STOCK_FROM_WATCHLIST = gql`
	mutation removeStockFromWatchlist($watchlistId: ID!, $stockId: ID!) {
		removeStockFromWatchlist(watchlistId: $watchlistId, stockId: $stockId) {
			_id
			name
			stocks {
				_id
				ticker
			}
		}
	}
`;

// Update a position
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

// Update a stock
export const UPDATE_STOCK = gql`
	mutation updateStock($stockId: ID!, $ticker: String!) {
		updateStock(stockId: $stockId, ticker: $ticker) {
			_id
			ticker
		}
	}
`;

// Update a watchlist
export const UPDATE_WATCHLIST = gql`
	mutation updateWatchlist($watchlistId: ID!, $name: String!) {
		updateWatchlist(watchlistId: $watchlistId, name: $name) {
			_id
			name
		}
	}
`;

// Update a user
export const UPDATE_USER = gql`
	mutation updateUser($amount: Int!) {
		updateUser(amount: $amount) {
			_id
			username
			amount
		}
	}
`;

// Update a user's password
export const UPDATE_USER_PASSWORD = gql`
	mutation updateUserPassword($password: String!) {
		updateUserPassword(password: $password) {
			_id
			username
			amount
		}
	}
`;

// Update a user's username
export const UPDATE_USER_USERNAME = gql`
	mutation updateUserUsername($username: String!) {
		updateUserUsername(username: $username) {
			_id
			username
			amount
		}
	}
`;

// Update a user's watchlists
export const UPDATE_USER_WATCHLISTS = gql`
	mutation updateUserWatchlists($watchlists: [ID]!) {
		updateUserWatchlists(watchlists: $watchlists) {
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

// Update a watchlist's stocks
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
