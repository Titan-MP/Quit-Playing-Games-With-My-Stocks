import React, { useState, useEffect } from "react";
import WatchlistCards from "../../components/WatchlistCards";
import AddStockToWatchlistDialog from "../../components/AddStockToWatchlistDialog";
import { Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AddCircleOutline } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { QUERY_USER_WATCHLIST } from "../../utils/queries";
import Auth from "../../utils/auth";

const WatchlistHeading = ({ watchlistName, refetchWatchlist }) => {
	return (
		<Grid
			container
			alignItems="center"
		>
			<Grid xs>
				<Typography
					variant="h4"
					gutterBottom
				>
					{watchlistName}
				</Typography>
			</Grid>
			<Grid>
				<AddStockToWatchlistDialog />
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
