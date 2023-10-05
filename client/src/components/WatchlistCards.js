import React, { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@apollo/client";
import { QUERY_STOCKS } from "../utils/queries";

const WatchlistCard = ({ stock }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
			>
				<Grid xs="auto">
					<Chip
						label={
							<Typography variant="body1">
								{stock.symbol}
							</Typography>
						}
						sx={{
							padding: "1rem"
						}}
					/>
				</Grid>
			</motion.div>
		</AnimatePresence>
	);
};

const WatchlistCards = ({ watchlist }) => {

	// Create an array of stock ids from the watchlist
	const stockIds = watchlist.stocks.map((stock) => stock._id);

	// Use the array of stockIds to get the stocks from the database
	const { data: stocks, refetch } = useQuery(QUERY_STOCKS, {
		variables: { ids: stockIds }
	});

	// Refetch the data whenever the watchlist prop changes
	useEffect(() => {
		refetch();
	}, [watchlist]);

	return (
		<Grid
			container
			spacing={2}
		>
			{stocks?.stocks.map((stock) => (
				<WatchlistCard
					key={stock.symbol}
					stock={stock}
				/>
			))}
		</Grid>
	);
};

export default WatchlistCards;
