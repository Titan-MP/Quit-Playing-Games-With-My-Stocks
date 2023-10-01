import PortfolioOverview from "./PortfolioOverview";
import Box from "@mui/material/Box";

const Dashboard = () => {
	return (
		<Box
			sx={{
				height: "100vh",
				backgroundColor: "transparent",
				backdropFilter: "blur(5px)",
			}}
		>
			<PortfolioOverview />
		</Box>
	);
};

export default Dashboard;
