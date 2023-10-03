import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import { Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from '@mui/icons-material/Paid';

const menuItems = [
	{
		pageName: "Dashboard",
		icon: <DashboardIcon />
	},
	{
		pageName: "Trade",
		icon: <PaidIcon />
	}
]

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 }
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 }
	}
};

const Navigation = () => {
	return (
		<Box
			component={motion.ul}
			variants={variants}
			sx={{
				margin: 0,
				padding: "25px",
				position: "absolute",
				top: "100px",
				width: "230px"
			}}
		>
			{menuItems.map((menuItem) => (
				<MenuItem
					key={menuItem.pageName}
					pageName={menuItem.pageName}
					icon={menuItem.icon}
				/>
			))}
		</Box>
	);
};

export default Navigation;
