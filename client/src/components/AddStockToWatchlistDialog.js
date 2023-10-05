import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_WATCHLIST, QUERY_WATCHLIST_STOCKS } from "../utils/queries";
import { ADD_STOCK, ADD_STOCK_TO_WATCHLIST } from "../utils/mutations";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from "@mui/material";

const AddStockToWatchlistDialog = () => {
	const [open, setOpen] = useState(false);
	const [ticker, setTicker] = useState("");
	const [addStock] = useMutation(ADD_STOCK);
	const [addStockToWatchlist] = useMutation(ADD_STOCK_TO_WATCHLIST);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// Get user's watchlist id
	const { watchlistsLoading, data: watchlistsData } = useQuery(
		QUERY_USER_WATCHLIST,
		{
			variables: { user: Auth.getProfile().data._id }
		}
	);

	// const watchlistId = watchlistsData?.watchlists[0]._id;

	const handleTickerChange = (event) => {
		setTicker(event.target.value);
	};
	const handleAddStock = async () => {
		try {
			const newStock = await addStock({
				variables: {
					symbol: ticker.toUpperCase(),
					name: "Company Name"
				}
			});

			await addStockToWatchlist({
				variables: {
					watchlistId: watchlistsData.watchlists[0]._id,
					stockId: newStock.data.addStock._id
				}
			});

			handleClose();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleOpen}
			>
				Add to Watchlist
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Add Stock to Watchlist</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the ticker symbol of the stock you want to add to
						the watchlist.
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
		</div>
	);
};

export default AddStockToWatchlistDialog;
