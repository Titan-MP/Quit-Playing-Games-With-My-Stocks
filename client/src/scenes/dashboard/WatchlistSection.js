import React, { useState } from "react";
import WatchlistCards from "../../components/WatchlistCards";
import AddStockToWatchlistDialog from "../../components/AddStockToWatchlistDialog";
import { Grid, Typography, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import {
	QUERY_USER_WATCHLIST,
	QUERY_WATCHLIST_STOCKS
} from "../../utils/queries";
import Auth from "../../utils/auth";

const WatchlistHeading = ({ watchlistName }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				<Typography variant="h4">{watchlistName}</Typography>
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
	const { loading: watchlistsLoading, data: userWatchlists } = useQuery(
		QUERY_USER_WATCHLIST,
		{
			variables: { user: Auth.getProfile().data._id }
		}
	);

	console.log(userWatchlists?.watchlists[0]._id);

	const { stocksLoading, data: watchlistStocks } = useQuery(
		QUERY_WATCHLIST_STOCKS,
		{
			variables: { id: userWatchlists?.watchlists[0]._id }
		}
	);

	console.log(watchlistStocks?.watchlist.stocks);

	return (
		<React.Fragment>
			<WatchlistHeading
				watchlistName={userWatchlists.watchlists[0].name}
			/>
			<WatchlistCards watchlist={userWatchlists?.watchlists} />
		</React.Fragment>
	);
};

export default WatchlistSection;
