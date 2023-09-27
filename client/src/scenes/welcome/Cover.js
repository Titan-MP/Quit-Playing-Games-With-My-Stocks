import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; 
import { ChartsImage, Analysis, Notes } from "../../assets/images";

const FeatureInsight = ({ image, description, motionVariant }) => {
	return (
		<Grid
			item
			xs={12}
			sm={4}
			component={motion.div}
			variants={motionVariant}
		>
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
				<Typography variant="subtitle1">{description}</Typography>
			</Box>
		</Grid>
	);
};

const Cover = () => {

	const coverContainer = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
				staggerDirection: 1
			}
		}
	};

	const coverItem = {
		hidden: { opacity: 0 },
		show: { opacity: 1 }
	};

	return (
		<Grid
			height={"100vh"}
			container
			spacing={2}
			component={motion.div}
			variants={coverContainer}
			initial="hidden"
			animate="show"
		>
			<Grid
				item
				xs={12}
				sx={{ textAlign: "center" }}
				component={motion.div}
				variants={coverItem}
				height={"75vh"}
			>
				<Typography variant="h3">Welcome to</Typography>
				<Typography variant="h1">"Application Name??"</Typography>
				<Typography variant="subtitle1">
					Your Personal Portfolio Simulator
				</Typography>
			</Grid>
			<Grid
				container
				xs={12}
				spacing={2}
				sx={{
					backgroundColor: "rgba(255, 255, 255, 0.2)",
					backdropFilter: "blur(5px)",
					padding: "20px"
				}}
			>
				<FeatureInsight
					image={ChartsImage}
					description={"Build and manage your own stock portfolio."}
					motionVariant={coverItem}
				/>
				<FeatureInsight
					image={Analysis}
					description={"Analyze multiple positions at once."}
					motionVariant={coverItem}
				/>

				<FeatureInsight
					image={Notes}
					description={
						"Keep a watchlist of your most relevant stocks."
					}
					motionVariant={coverItem}
				/>
			</Grid>
		</Grid>
	);
};

export default Cover;
