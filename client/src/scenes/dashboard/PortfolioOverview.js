import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import YTDProfitLossAreaGraph from "../../components/YTDProfitLossAreaGraph";
import BuyingPowerPieChart from "../../components/BuyingPowerPieChart";
import { useTheme } from "@mui/material/styles";
import PositionCards from "../../components/PositionCards";
import WatchlistCards from "../../components/WatchlistCards";

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

const PortfolioOverviewMetrics = ({ metricName, metricData }) => {
	const theme = useTheme();

	return (
		<Grid item>
			<Typography variant="h5" color={"text.secondary"}>{metricName}</Typography>
			<Typography
				fontSize={theme.typography.h2.fontSize}
				fontWeight="100"
			>
				{metricData}
			</Typography>
		</Grid>
	);
};

const PortfolioOverview = () => {
	const theme = useTheme();

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

	return (
		<Grid
			height={"100vh"}
			padding={theme.spacing(2)}
			container
			spacing={2}
			component={motion.div}
			variants={coverContainer}
			initial="hidden"
			animate="show"
		>
			<Grid
				item
				xs={12}
				component={motion.div}
				variants={coverItem}
			>
				<Typography variant="h3">Portfolio Overview</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
				component={motion.div}
				variants={coverItem}
			>
				<Grid
					container
					spacing={2}
					direction="column"
				>
					<PortfolioOverviewMetrics
						metricName="Net Liq."
						metricData="$100,000.00"
					/>
					<PortfolioOverviewMetrics
						metricName="P/L YTD"
						metricData="$10,000.00"
					/>
					<PortfolioOverviewMetrics
						metricName="Buying Power"
						metricData="$50,000.00"
					/>
				</Grid>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
				component={motion.div}
				variants={coverItem}
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
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
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
				/>
			</Grid>
			<Grid
				item
				xs={12}
				component={motion.div}
				variants={coverItem}
			>
				<Typography variant="h5">Positions</Typography>
				<PositionCards />
			</Grid>
			<Grid
				item
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
