import * as React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	}
};

const MenuItem = ({ pageName, icon }) => {
	return (
		<Box
			component={motion.li}
			variants={variants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			sx={{
				margin: "0",
				padding: "0",
				listStyle: "none",
				display: "flex",
				alignItems: "center",
				cursor: "pointer",
				marginBottom: "10px"
			}}
		>
			<Box
				sx={{
					marginRight: "10px"
				}}
			>
				{icon}
			</Box>

			<Typography variant="h6">{pageName}</Typography>
		</Box>
	);
};

export default MenuItem;
