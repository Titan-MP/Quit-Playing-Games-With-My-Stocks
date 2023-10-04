import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FeatureInsightSection from "./FeatureInsightSection";

import './WelcomePage.css'
import LogoIcon from '../../assets/images/MockTradeLogo.png'

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
		<section id="WelcomePage">
	
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
				
				<img src={LogoIcon} alt="iconlogo" className="MockTradeLogo"></img>
				

				<div className="appName">
				<Typography >
					MockTrade
				</Typography>
				</div>

				<div className="summ">
				<Typography variant="h5" >
					Your Personal Portfolio Simulator
				</Typography>
				</div>

			</Grid>
			<FeatureInsightSection
				motionVariants={[welcomeContainer, welcomeItem]}
			/>
		</Grid>
		
		</section>
	);
};



export default WelcomePage;
