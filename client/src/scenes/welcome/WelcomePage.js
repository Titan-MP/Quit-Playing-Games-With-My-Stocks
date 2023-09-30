import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FeatureInsightSection from "./FeatureInsightSection";
import { MockTradeLogoSVG } from "../../assets/images";

const WelcomePage = () => {
	const welcomeContainer = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
				staggerDirection: 0.1
			}
		}
	};

	const welcomeItem = {
		hidden: { opacity: 0 },
		show: { opacity: 1 }
	};

	return (
		<Grid
			height={"100vh"}
			container
			spacing={2}
			sx={{
				paddingTop: "5vh",
				paddingBottom: "5vh"
			}}
		>
			<Grid
				item
				xs={12}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "75vh"
				}}
			>
				<MockTradeLogoSVG />
				<Typography
					sx={{
						fontSize: "6rem"
					}}
				>
					MockTrade
				</Typography>
				<Typography variant="h5">
					Your Personal Portfolio Simulator
				</Typography>
			</Grid>
			<FeatureInsightSection
				motionVariants={[welcomeContainer, welcomeItem]}
			/>
		</Grid>
	);
};

export default WelcomePage;
