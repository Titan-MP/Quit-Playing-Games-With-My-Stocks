import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

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
	if (!watchlist.stocks || watchlist.stocks.length === 0) {
		return null;
	}

	/**
	 * Returns an array of unique stocks from the watchlist array based on their symbol property.
	 * @param {Array} watchlist - An array of stock objects.
	 * @returns {Array} - An array of unique stock objects based on their symbol property.
	 */
	const uniqueWatchlist = Array.from(
		new Set(watchlist.stocks.map((stock) => stock.symbol))
	).map((symbol) => watchlist.stocks.find((stock) => stock.symbol === symbol));

	/**
	 * Sorts the uniqueWatchlist array in alphabetical order based on the symbol property of each object.
	 * @param {Array} uniqueWatchlist - An array of objects representing the user's unique watchlist.
	 * @returns {Array} - The sorted uniqueWatchlist array.
	 */
	const sortedWatchlist = uniqueWatchlist.sort((a, b) =>
		a.symbol.localeCompare(b.symbol)
	);

	return (
		<Grid
			container
			spacing={2}
		>
			{sortedWatchlist.map((stock) => (
				<WatchlistCard
					key={stock.symbol}
					stock={stock}
				/>
			))}
		</Grid>
	);
};

export default WatchlistCards;
