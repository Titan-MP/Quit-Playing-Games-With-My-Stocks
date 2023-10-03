import PortfolioOverview from "./PortfolioOverview";
import Box from "@mui/material/Box";
import Topbar from ".././global/Topbar";
import Sidebar from ".././global/sidebar/Sidebar";
import { useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleSidebarOpen = () => {
		setIsSidebarOpen(true);
	};

	const handleSidebarClose = () => {
		setIsSidebarOpen(false);
	};

	const sidebarVariants = {
		open: {
			paddingLeft: "300px",
			transition: {
				duration: 0.5
			}
		},
		closed: {
			paddingLeft: "0",
			transition: {
				delay: 1,
				duration: 0.5
			}
		}
	};

	return (
		<Box
			sx={{
				backgroundColor: "transparent",
				backdropFilter: "blur(5px)"
			}}
		>
			<Sidebar
				onOpen={handleSidebarOpen}
				onClose={handleSidebarClose}
			/>
			<div className="app">
				<div className="content">
					<Topbar />
					<motion.div
						variants={sidebarVariants}
						initial="closed"
						animate={isSidebarOpen ? "open" : "closed"}
					>
						<PortfolioOverview />
					</motion.div>
				</div>
			</div>
			{/* <PortfolioOverview /> */}
		</Box>
	);
};

export default Dashboard;
