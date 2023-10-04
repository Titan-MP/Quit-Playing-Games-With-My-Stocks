import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import YTDProfitLossAreaGraph from "../../components/YTDProfitLossAreaGraph";
import BuyingPowerPieChart from "../../components/BuyingPowerPieChart";
import { useTheme } from "@mui/material/styles";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import {
	QUERY_USER_POSITIONS,
	QUERY_USER_WATCHLIST,
	QUERY_USER_INITIAL_FUNDING
} from "../../utils/queries";
import { useRef } from "react";
import PositionsSection from "./PositionsSection";
import WatchlistSection from "./WatchlistSection";
import PortfolioOverviewMetrics from "../../components/PortfolioOverviewMetrics";

/**
 * Converts a number to a US dollar currency format.
 * @param {number} num - The number to be converted.
 * @returns {string} - The number in US dollar currency format.
 */
const toUSD = (num) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	}).format(num);
};

/**
 * Calculates and returns the portfolio metrics data.
 * @param {string} initialFunding - The initial funding amount.
 * @param {Array} positions - The user's positions.
 * @returns {Object} - The portfolio metrics data.
 */
const calculatePortfolioMetricsData = (initialFunding, positions) => {
	const netLiquidation = positions.reduce((total, position) => {
		return total + position.price * position.quantity;
	}, 0);

	const buyingPower =
		netLiquidation + parseFloat(initialFunding.replace(/[^0-9.-]+/g, ""));

	const profitLossYTD = positions.reduce((total, position) => {
		return (
			total +
			position.quantity * (position.stock.currentPrice - position.price)
		);
	}, 0);

	if (positions.length === 0 && profitLossYTD === 0) {
		return {
			netLiquidation: initialFunding,
			buyingPower: initialFunding,
			profitLossYTD: toUSD(profitLossYTD)
		};
	}

	return {
		netLiquidation: toUSD(netLiquidation),
		buyingPower: toUSD(buyingPower),
		profitLossYTD: toUSD(profitLossYTD)
	};
};

/**
 * Renders the portfolio overview page, including metrics, graphs, and position/watchlist cards.
 * @returns {JSX.Element} The portfolio overview page.
 */
const PortfolioOverview = () => {
	const theme = useTheme();
	const positions = [];

	const { watchlistsLoading, data: watchlistsData } = useQuery(
		QUERY_USER_WATCHLIST,
		{
			variables: { user: Auth.getProfile().data._id }
		}
	);

	const { initialFundingLoading, data: initialFundingData } = useQuery(
		QUERY_USER_INITIAL_FUNDING,
		{
			variables: { username: Auth.getProfile().data.username }
		}
	);

	const initialFunding = toUSD(initialFundingData?.user?.initialFunding || 0);

	const { positionsLoading, data: positionsData } = useQuery(
		QUERY_USER_POSITIONS,
		{
			variables: { username: Auth.getProfile().data.username }
		}
	);

	if (positionsData?.user?.positions) {
		positionsData.user.positions.forEach((position) => {
			positions.push({
				_id: position._id,
				stock: {
					_id: position.stock._id,
					ticker: position.stock.ticker
				},
				price: position.price,
				quantity: position.quantity
			});
		});
	}

	const portfolioMetricsData = calculatePortfolioMetricsData(
		initialFunding,
		positions
	);

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
						metricData={portfolioMetricsData.netLiquidation}
					/>

					<PortfolioOverviewMetrics
						metricName="P/L YTD"
						metricData={portfolioMetricsData.profitLossYTD}
					/>
					<PortfolioOverviewMetrics
						metricName="Buying Power"
						metricData={portfolioMetricsData.buyingPower}
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
					height={"600px"}
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
					height={"600px"}
				/>
			</Grid>
			<Grid
				xs={12}
				component={motion.div}
				variants={coverItem}
			>
				<PositionsSection />
			</Grid>
			<Grid
				xs={12}
				component={motion.div}
				variants={coverItem}
			>
				<WatchlistSection />
			</Grid>
		</Grid>
	);
};

export default PortfolioOverview;
