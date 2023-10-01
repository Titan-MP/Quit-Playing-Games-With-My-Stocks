import PortfolioOverview from "./PortfolioOverview";
import SearchAppBar from "./Sidebar";
import Box from "@mui/material/Box";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

const Dashboard = () => {
	return (
		<Box
			sx={{
				height: "100vh",
				backgroundColor: "transparent",
				backdropFilter: "blur(5px)",
			}}
		>
			<Router>
				<div className="App">
			<SearchAppBar />
			<Routes>
				<Route path="/Dashboard" element={<Dashboard />}></Route>
				<Route path="/Dashboard" element={<Dashboard />}></Route>
				<Route path="/Dashboard" element={<Dashboard />}></Route>
				<Route path="/Dashboard" element={<Dashboard />}></Route>
			</Routes>
			</div>
			</Router>
			<PortfolioOverview />
		</Box>
	);
};

export default Dashboard;
