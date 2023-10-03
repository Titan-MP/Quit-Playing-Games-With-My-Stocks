import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import YTDProfitLossAreaGraph from "../../components/YTDProfitLossAreaGraph";
import BuyingPowerPieChart from "../../components/BuyingPowerPieChart";
import { useTheme } from "@mui/material/styles";
import PositionCards from "../../components/PositionCards";
import WatchlistCards from "../../components/WatchlistCards";
import PortfolioMetricsData from "../../utils/portfolioMetricsCalculations";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER_POSITIONS } from "../../utils/queries";
import { useRef } from "react";

// TODO: Remove this example watchlist
const exampleWatchlist = [
	{ symbol: "AAPL" },
	{ symbol: "MSFT" },
	{ symbol: "GOOG" },
	{ symbol: "AMZN" },
	{ symbol: "FB" },
	{ symbol: "TSLA" },
	{ symbol: "NVDA" },
	{ symbol: "PYPL" },
	{ symbol: "ADBE" },
	{ symbol: "NFLX" },
	{ symbol: "CMG" },
	{ symbol: "SBUX" },
	{ symbol: "NKE" },
	{ symbol: "DIS" },
	{ symbol: "MCD" },
	{ symbol: "BABA" },
	{ symbol: "KO" },
	{ symbol: "INTC" },
	{ symbol: "AMD" },
	{ symbol: "QCOM" },
	{ symbol: "TMUS" },
	{ symbol: "VZ" },
	{ symbol: "T" },
	{ symbol: "CSCO" },
	{ symbol: "CRM" },
	{ symbol: "ORCL" },
	{ symbol: "IBM" },
	{ symbol: "NOW" },
	{ symbol: "SQ" },
	{ symbol: "ZM" },
	{ symbol: "TWTR" },
	{ symbol: "SNAP" },
	{ symbol: "UBER" },
	{ symbol: "LYFT" },
	{ symbol: "PINS" },
	{ symbol: "TTD" },
	{ symbol: "ROKU" },
	{ symbol: "SHOP" },
	{ symbol: "NET" },
	{ symbol: "DOCU" },
	{ symbol: "ZS" },
	{ symbol: "CRWD" },
	{ symbol: "OKTA" },
	{ symbol: "DDOG" },
	{ symbol: "FSLY" },
	{ symbol: "MDB" },
	{ symbol: "SPLK" },
	{ symbol: "PANW" },
	{ symbol: "FTNT" },
	{ symbol: "SPY" },
	{ symbol: "QQQ" }
];

/**
 * Renders a single metric for the portfolio overview.
 * @param {Object} props - The component props.
 * @param {string} props.metricName - The name of the metric to display.
 * @param {string} props.metricData - The data for the metric to display.
 * @returns {JSX.Element} - The rendered component.
 */
const PortfolioOverviewMetrics = ({ metricName, metricData }) => {
	const theme = useTheme();

	return (
		<Grid>
			<Typography
				variant="h6"
				color={"text.secondary"}
			>
				{metricName}
			</Typography>
			<Typography
				fontSize={theme.typography.h4.fontSize}
				fontWeight="100"
			>
				{metricData}
			</Typography>
		</Grid>
	);
};

/**
 * Renders the portfolio overview page, including metrics, graphs, and position/watchlist cards.
 * @returns {JSX.Element} The portfolio overview page.
 */
const PortfolioOverview = () => {
	const theme = useTheme();
	const { loading, data } = useQuery(QUERY_USER_POSITIONS, {
		variables: { username: Auth.getProfile().data.username }
	});
	const positions = data?.user?.positions || [];

	const coverContainer = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
				staggerDirection: 1
			}
		}
	};

	const coverItem = {
		hidden: { opacity: 0 },
		show: { opacity: 1 }
	};

	const containerRef = useRef(null);

	return (
		<Grid
			padding={theme.spacing(2)}
			container
			spacing={2}
			component={motion.div}
			variants={coverContainer}
			initial="hidden"
			animate="show"
			sx={{
				display: "flex",
				height: "100vh",
				width: "100vw"
			}}
		>
			<Grid
				xs={12}
				component={motion.div}
				variants={coverItem}
			>
				<Typography variant="h3">Portfolio Overview</Typography>
			</Grid>
			<Grid
				xs={12}
				sm={2}
				component={motion.div}
				variants={coverItem}
			>
				<Grid
					container
					spacing={2}
					direction="column"
				>
					<PortfolioOverviewMetrics
						metricName={"Net Liquidation"}
						metricData={PortfolioMetricsData.netLiquidation}
					/>

					<PortfolioOverviewMetrics
						metricName="P/L YTD"
						metricData={PortfolioMetricsData.profitLossYTD}
					/>
					<PortfolioOverviewMetrics
						metricName="Buying Power"
						metricData={PortfolioMetricsData.buyingPower}
					/>
				</Grid>
			</Grid>
			<Grid
				xs={12}
				sm={5}
				component={motion.div}
				variants={coverItem}
				ref={containerRef}
			>
				<YTDProfitLossAreaGraph
					data={{
						date: [
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
							"Nov",
							"Dec"
						],
						netLiqValue: [
							101000, 103000, 106000, 110000, 115000, 121000,
							128000, 136000, 145000, 155000, 150000, 144000
						],
						profitLoss: [
							1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,
							9000, 10000, -5000, -6000
						]
					}}
					height={containerRef.current?.clientHeight}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={5}
				component={motion.div}
				variants={coverItem}
			>
				<BuyingPowerPieChart
					datasets={{
						data: [
							{ value: 70000, name: "Unallocated Funds" },
							{ value: 30000, name: "Allocated Funds" }
						]
					}}
					height={containerRef.current?.clientHeight}
				/>
			</Grid>
			{positions.length > 0 && (
				<Grid
					xs={12}
					component={motion.div}
					variants={coverItem}
				>
					<Typography variant="h5">Positions</Typography>
					<PositionCards />
				</Grid>
			)}
			<Grid
				xs={12}
				component={motion.div}
				variants={coverItem}
			>
				<Typography variant="h4">Watchlist</Typography>
				<WatchlistCards watchlist={exampleWatchlist} />
			</Grid>
		</Grid>
	);
};

export default PortfolioOverview;
