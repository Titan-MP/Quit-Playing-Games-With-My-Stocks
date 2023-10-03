import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CardContent, CardMedia } from "@mui/material";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

const PositionCard = ({ position }) => {
	const theme = useTheme();
	const [chartVisibiltiy, setChartVisibility] = useState(true);

	const PositionMetric = ({ metricName, metricData }) => {
		return (
			<Grid>
				<Typography
					variant="subtitle2"
					color={"text.secondary"}
				>
					{metricName}
				</Typography>
				<Typography variant="h4">{metricData}</Typography>
			</Grid>
		);
	};

	useEffect(() => {
		if (window.innerWidth < 300) {
			setChartVisibility(false);
		} else {
			setChartVisibility(true);
		}
	}, []);

	return (
		<Grid
			xs={12}
			sm={6}
			md={4}
			lg={3}
		>
			<Card
				sx={{
					display: "flex",
					padding: theme.spacing(2)
				}}
			>
				<CardContent
					sx={{
						flex: "1 0 auto"
					}}
				>
					<PositionMetric
						metricName={"Ticker"}
						metricData={position.ticker}
					/>
					<PositionMetric
						metricName={"Purchase Price"}
						metricData={position.purchasePrice}
					/>
					<PositionMetric
						metricName={"Quantity"}
						metricData={position.quantity}
					/>
				</CardContent>
				<CardMedia
					sx={{
						display: "block",
						width: "100%"
					}}
				>
					<ReactECharts
						option={{
							grid: {
								left: "3%",
								right: "4%",
								bottom: "3%",
								containLabel: true
							},
							tooltip: {
								trigger: "axis"
							},
							xAxis: {
								type: "category",
								data: position.threeMonthDates
							},
							yAxis: {
								type: "value"
							},
							series: [
								{
									data: position.threeMonthPrices,
									type: "line",
									areaStyle: {}
								}
							]
						}}
					/>
				</CardMedia>
			</Card>
		</Grid>
	);
};

const PositionCards = ({ positions }) => {
	const examplePositions = [
		{
			ticker: "AAPL",
			quantity: 10,
			purchasePrice: 150.39,
			threeMonthDates: ["Jul", "Aug", "Sep"],
			threeMonthPrices: [100.0, 120.0, 150.0]
		},
		{
			ticker: "TSLA",
			quantity: 5,
			purchasePrice: 800.47,
			threeMonthDates: ["Jul", "Aug", "Sep"],
			threeMonthPrices: [700.0, 750.0, 800.0]
		},
		{
			ticker: "AMZN",
			quantity: 2,
			purchasePrice: 3500.45,
			threeMonthDates: ["Jul", "Aug", "Sep"],
			threeMonthPrices: [3000.0, 3250.0, 3500.0]
		},
		{
			ticker: "MSFT",
			quantity: 10,
			purchasePrice: 300.45,
			threeMonthDates: ["Jul", "Aug", "Sep"],
			threeMonthPrices: [250.0, 275.0, 300.0]
		}
	];

	return (
		<Grid
			container
			spacing={2}
		>
			{examplePositions.map((position, index) => (
				<PositionCard
					key={index}
					position={position}
				/>
			))}
		</Grid>
	);
};

export default PositionCards;
