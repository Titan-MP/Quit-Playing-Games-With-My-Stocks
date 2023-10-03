import Auth from "./auth";
import { QUERY_USER_INITIAL_FUNDING } from "./queries";
import { useQuery } from "@apollo/client";

/**
 * Converts a number to a US dollar currency format.
 * @param {number} num - The number to be converted.
 * @returns {string} - The US dollar currency format of the input number.
 */
const toUSD = function (num) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	}).format(num);
};

/**
 * Calculates the portfolio overview metrics.
 * @returns {Object} An object containing the net liquidation, profit/loss YTD, and buying power.
 */
const PortfolioMetricsData = function () {
	let netLiquidation = 0;
	let profitLossYTD = 0;
	let buyingPower = 0;
	const initialFunding = toUSD(
		useQuery(QUERY_USER_INITIAL_FUNDING, {
			variables: { username: Auth.getProfile().data.username }
		})?.user?.initialFunding
	);

	return {
		netLiquidation,
		profitLossYTD,
		buyingPower
	};
};

export default PortfolioMetricsData;
