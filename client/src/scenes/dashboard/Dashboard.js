import PortfolioOverview from "./PortfolioOverview";
import Box from "@mui/material/Box";
import Topbar from ".././global/Topbar";

const Dashboard = () => {
	return (
		<Box
			sx={{
				height: "100vh",
				backgroundColor: "transparent",
				backdropFilter: "blur(5px)",
			}}
		>
			<div className="app">
				<div className="content">
					<Topbar/>
					<PortfolioOverview />
				</div>
			</div>
			{/* <PortfolioOverview /> */}
		</Box>
	);
};

export default Dashboard;
