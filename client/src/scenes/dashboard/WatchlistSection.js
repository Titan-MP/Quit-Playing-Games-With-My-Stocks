import React, { useState, useEffect } from "react";
import WatchlistCards from "../../components/WatchlistCards";
import AddStockToWatchlistDialog from "../../components/AddStockToWatchlistDialog";
import { Grid, Typography, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import {
	QUERY_USER_WATCHLIST,
	QUERY_WATCHLIST_STOCKS,
	QUERY_USER_WATCHLIST_STOCKS
} from "../../utils/queries";
import Auth from "../../utils/auth";

const WatchlistHeading = ({ watchlistName, refetchWatchlist }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		refetchWatchlist();
	};
	return (
		<Grid
			container
			alignItems="center"
		>
			<Grid
				item
				xs
			>
				<Typography variant="h4" gutterBottom>{watchlistName}</Typography>
			</Grid>
			<Grid item>
				<IconButton onClick={handleOpen}>
					<AddCircleOutline />
				</IconButton>
				<AddStockToWatchlistDialog
					open={open}
					handleClose={handleClose}
				/>
			</Grid>
		</Grid>
	);
};

const WatchlistSection = () => {
	const { data: userWatchlists, refetch } = useQuery(QUERY_USER_WATCHLIST, {
		variables: { user: Auth.getProfile().data._id }
	});

	const [watchlistStocks, setWatchlistStocks] = useState([]);

	useEffect(() => {
		if (userWatchlists?.watchlists[0]?.stocks) {
			const stocks = userWatchlists.watchlists[0].stocks;
			setWatchlistStocks(stocks);
		}
	}, [userWatchlists]);

	return (
		<React.Fragment>
			<WatchlistHeading
				watchlistName={userWatchlists?.watchlists[0]?.name}
				refetchWatchlist={refetch}
			/>
			{watchlistStocks.length > 0 && (
				<WatchlistCards watchlist={userWatchlists.watchlists[0]} />
			)}
			{watchlistStocks.length === 0 && (
				<Typography variant="body1">
					Your watchlist is empty.
				</Typography>
			)}
		</React.Fragment>
	);
};

export default WatchlistSection;
