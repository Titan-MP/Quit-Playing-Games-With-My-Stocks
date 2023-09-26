                                                                /* =================== IMPORTS ======================= */

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { SignupForm, PreparePortfolioForm } from "../form";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { motion, useMotionValue, useTransform } from "framer-motion";


                                                                /* ==================== CONSTANTS ===================== */

const accountCreationSteps = [
	"Simple Sign Up",
	"Prepare Portfolio",
	"Watch Some Stocks"
];


                                                                /* ==================== COMPONENTS ==================== */

																/* ---------------- CIRCULAR PROGRESS ----------------- */
const CircularProgress = ({ progress }) => {
	const circleLength = useTransform(progress, [0, 100], [0, 1]);
	const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1]);
	const circleColor = useTransform(
		progress,
		[0, 95, 100],
		["#FFCC66", "#FFCC66", "#66BB66"]
	);

	console.log(progress);

	return (
		<React.Fragment>
			<motion.div
				initial={{ x: 0 }}
				animate={{ x: 100 }}
				style={{ x: progress }}
				transition={{ duration: 1 }}
			/>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width="258"
				height="258"
				viewBox="0 0 258 258"
			>
				{/* Check mark  */}
				<motion.path
					transform="translate(60 85)"
					d="M3 50L45 92L134 3"
					fill="transparent"
					stroke="#7BB86F"
					strokeWidth={8}
					style={{ pathLength: checkmarkPathLength }}
				/>
				{/* Circle */}
				<motion.path
					d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
					fill="transparent"
					strokeWidth="8"
					stroke={circleColor}
					style={{
						pathLength: circleLength
					}}
				/>
			</motion.svg>
		</React.Fragment>
	);
};

																/* ------------------ DIALOG STEPPER ------------------ */
const DialogStepper = ({ activeStep }) => {
	return (
		<Box sx={{ paddingTop: "30px", paddingBottom: "30px", width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{accountCreationSteps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step
							key={label}
							{...stepProps}
						>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Box>
	);
}

                                                                /* -------------- DIALOG NAVIGATION BAR --------------- */
const DialogNavigation = ({ activeStep, setActiveStep, onClose }) => {
	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleClose = () => {
		setActiveStep(0);
		onClose();
	};

	return (
		<React.Fragment>
			{activeStep === accountCreationSteps.length ? (
				<React.Fragment>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							pt: 2
						}}
					>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleClose}>Close</Button>
					</Box>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							pt: 2
						}}
					>
						<Button
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={handleNext}>
							{activeStep === accountCreationSteps.length - 1
								? "Finish"
								: "Next"}
						</Button>
					</Box>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

                                                                /* -------------- DIALOG SWIPEABLE VIEW --------------- */
const DialogSwipeView = ({ activeStep }) => {
	let progress = useMotionValue(90);

	return (
		<SwipeableViews index={activeStep}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<SignupForm />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<PreparePortfolioForm />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Typography
					variant="h3"
					align="center"
					paddingBottom="30px"
				>
					Watch Some Stocks
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Typography
					variant="h3"
					align="center"
					paddingBottom="30px"
				>
					You're All Set!
				</Typography>
				{activeStep === accountCreationSteps.length && (
					<CircularProgress progress={progress} />
				)}
			</Box>
		</SwipeableViews>
	);
};        

                                                                /* -------------- DIALOG: CREATE ACCOUNT -------------- */
const CreateAccountDialog = ({ onOpen, onClose }) => {
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = React.useState(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog
			open={onOpen}
			onClose={onClose}
		>
			<DialogContent>
				<DialogStepper activeStep={activeStep} />
				<DialogSwipeView activeStep={activeStep} />
				<DialogNavigation
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					onClose={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
};


                                                                /* ===================== EXPORTS ====================== */
																
export default CreateAccountDialog;
