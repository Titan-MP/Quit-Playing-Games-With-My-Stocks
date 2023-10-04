import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import {
    QUERY_USER_WATCHLIST,
    QUERY_WATCHLIST_STOCKS
} from "../utils/queries";
import { ADD_STOCK_TO_WATCHLIST } from "../utils/mutations";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";



const AddStockToWatchlistDialog = ({ open, handleClose }) => {
	const [ticker, setTicker] = useState("");
	const [addStockToWatchlist] = useMutation(ADD_STOCK_TO_WATCHLIST);

	// Get user's watchlist id
	const { watchlistsLoading, data: watchlistsData } = useQuery(
		QUERY_USER_WATCHLIST,
		{
			variables: { user: Auth.getProfile().data._id }
		}
	);

	const handleTickerChange = (event) => {
		setTicker(event.target.value);
	};
	const handleAddStock = async () => {
		try {
			await addStockToWatchlist({
				variables: {
					user: Auth.getProfile().data._id,
					watchlistId: watchlistsData.watchlists[0]._id,
					ticker: ticker.toUpperCase()
				}
			});
			handleClose();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>Add Stock to Watchlist</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the ticker symbol of the stock you want to add to the
					watchlist.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="ticker"
					label="Ticker Symbol"
					type="text"
					fullWidth
					value={ticker}
					onChange={handleTickerChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					onClick={handleAddStock}
					color="primary"
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddStockToWatchlistDialog;