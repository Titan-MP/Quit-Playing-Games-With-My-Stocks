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
import { useQuery } from "@apollo/client";
import { QUERY_STOCK } from "../utils/queries";

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

const PositionCard = ({ position }) => {
	const theme = useTheme();
	const [chartVisibility, setChartVisibility] = useState(true);
	const { loading, data: stockData } = useQuery(QUERY_STOCK, {
		variables: { id: position.stock._id }
	});

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
					{stockData && (
						<PositionMetric
							metricName={"Ticker"}
							metricData={stockData.stock.symbol}
						/>
					)}
					<PositionMetric
						metricName={"Purchase Price"}
						metricData={position.price}
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
					{stockData && chartVisibility && (
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
									data: ["Jul", "Aug", "Sep"]
								},
								yAxis: {
									type: "value"
								},
								series: [
									{
										data: [100.0, 60.0, 150.0],
										type: "line",
										areaStyle: {},
										smooth: true
									}
								]
							}}
						/>
					)}
				</CardMedia>
			</Card>
		</Grid>
	);
};

const PositionCards = ({ positions }) => {
	return (
		<Grid
			container
			spacing={2}
		>
			{positions &&
				positions.map((position, index) => {
					return (
						<PositionCard
							key={index}
							position={position}
						/>
					);
				})}
		</Grid>
	);
};

export default PositionCards;
