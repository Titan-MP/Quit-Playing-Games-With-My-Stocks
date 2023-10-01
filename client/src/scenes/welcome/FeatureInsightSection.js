import React, { useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
	BuildManagePortfolioSVG,
	AnalyzePositionsSVG,
	KeepStockWatchlistsSVG
} from "../../assets/images";

const FeatureInsight = ({
	image,
	description,
	motionVariant,
	featureColor,
	setFeatureSectionBackground
}) => {
	return (
		<Grid
			item
			xs={12}
			sm={4}
			component={motion.div}
			variants={motionVariant}
		>
			<Box
				component={motion.a}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
				whileHover={{ scale: 1.2 }}
				onHoverStart={() =>
					setFeatureSectionBackground(featureColor, 0.1)
				}
				onHoverEnd={() => setFeatureSectionBackground()}
			>
				{image}
				<Typography variant="subtitle1">{description}</Typography>
			</Box>
		</Grid>
	);
};

const FeatureInsightSection = ({ motionVariants }) => {
	const [featureBackground, setFeatureBackground] = useState("transparent");

	const handleFeatureBackground = (featureColor, opacity) => {
        if (featureColor && opacity)
        {
            setFeatureBackground(hexToRGBA(featureColor, opacity));
        }
        else if (!opacity)
        {
            setFeatureBackground(featureColor);
        }
        else if (!featureColor)
        {
            setFeatureBackground("transparent");
        }
	};

	const hexToRGBA = (hex, alpha) => {
		var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha) {
			return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
		} else {
			return "rgb(" + r + ", " + g + ", " + b + ")";
		}
	};

	return (
		<Grid
			container
			xs={12}
			spacing={2}
			component={motion.div}
			variants={motionVariants[0]}
			sx={{
				backgroundColor: featureBackground,
				paddingTop: "5vh",
				paddingBottom: "5vh",
				"&:hover": {
					backdropFilter: "blur(5px)"
				}
			}}
		>
			<FeatureInsight
				image={<BuildManagePortfolioSVG />}
				description={"Build and manage your own stock portfolio."}
				motionVariant={motionVariants[1]}
				featureColor={"#FF7272"}
				setFeatureSectionBackground={handleFeatureBackground}
			/>
			<FeatureInsight
				image={<AnalyzePositionsSVG />}
				description={"Analyze multiple positions at once."}
				motionVariant={motionVariants[1]}
				featureColor={"#407BFF"}
				setFeatureSectionBackground={handleFeatureBackground}
			/>
			<FeatureInsight
				image={<KeepStockWatchlistsSVG />}
				description={"Keep a watchlist of your most relevant stocks."}
				motionVariant={motionVariants[1]}
				featureColor={"#FFC727"}
				setFeatureSectionBackground={handleFeatureBackground}
			/>
		</Grid>
	);
};

export default FeatureInsightSection;
