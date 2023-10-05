import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
				fontSize={theme.typography.h3.fontSize}
				fontWeight="100"
			>
				{metricData}
			</Typography>
		</Grid>
	);
};

export default PortfolioOverviewMetrics;
