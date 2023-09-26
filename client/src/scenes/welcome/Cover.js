import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { motion, AnimatePrecense } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; 
import ChartsImage from "../../assets/images/Charts-pana.svg";
import Analysis from "../../assets/images/Analysis-rafiki.svg";
import Notes from "../../assets/images/Notes-rafiki.svg";

const FeatureInsight = ({ image, description }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			}}
		>
			<img
				src={image}
				alt={description}
				style={{ width: "100%", maxWidth: "400px" }}
			/>
			<Typography variant="body1">{description}</Typography>
		</Box>
	);
};

const Cover = () => {
	return (
		<Grid
			container
			spacing={2}
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, delay: 2 }}
		>
			<Grid
				item
				xs={12}
				sx={{ textAlign: "center" }}
			>
				<Typography variant="h3">Welcome to</Typography>
				<Typography variant="h1">"Application Name??"</Typography>
				<Typography variant="subtitle1">
					Your Personal Portfolio Simulator
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
			>
				<FeatureInsight
					image={ChartsImage}
					description={"Build and manage your own stock portfolio."}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
			>
				<FeatureInsight
					image={Analysis}
					description={"Analyze multiple positions at once."}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
			>
				<FeatureInsight
					image={Notes}
					description={
						"Keep a watchlist of your most relevant stocks."
					}
				/>
			</Grid>
		</Grid>
	);
};

export default Cover;
