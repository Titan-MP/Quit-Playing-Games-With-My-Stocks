import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import { Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from '@mui/icons-material/Paid';
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const menuItems = [
	{
		key: 0,
		pageName: "Dashboard",
		icon: <DashboardIcon />
	},
	{
		key: 1,
		pageName: "Trade",
		icon: <PaidIcon />
	},
	{
		key: 2,
		pageName: "Charts",
		icon: <QueryStatsIcon />
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
			{menuItems.map((menuItem, index) => (
				<MenuItem
					key={menuItem.key}
					pageName={menuItem.pageName}
					icon={menuItem.icon}
				/>
			))}
		</Box>
	);
};

export default Navigation;
