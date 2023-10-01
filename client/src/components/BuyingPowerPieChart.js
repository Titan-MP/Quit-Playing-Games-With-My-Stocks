import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useTheme } from "@mui/material/styles";

echarts.use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	PieChart,
	CanvasRenderer,
	LabelLayout
]);

const BuyingPowerPieChart = ({ datasets }) => {
	const theme = useTheme();

	const options = {
		title: {
			text: "Buying Power",
			left: "center",
			textStyle: {
				color: theme.palette.text.primary
			}
		},
		tooltip: {
			trigger: "item"
		},
		legend: {
			top: "5%",
			right: "right",
            textStyle: {
                color: theme.palette.text.primary
            }
		},
		series: [
			{
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: "#fff",
					borderWidth: 2
				},
				label: {
					show: false,
					position: "center"
				},
				emphasis: {
				},
				labelLine: {
					show: false
				},
				data: datasets.data
			}
		]
	};

	return <ReactECharts option={options} />;
};

export default BuyingPowerPieChart;
