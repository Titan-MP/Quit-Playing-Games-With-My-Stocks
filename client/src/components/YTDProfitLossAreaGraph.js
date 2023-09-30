import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { TitleComponent, TooltipComponent, GridComponent } from "echarts/components";
import { useTheme } from "@mui/material/styles";


echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);


const YTDProfitLossAreaGraph = ({ data }) => {
    const theme = useTheme();

	const options = {
		title: {
			text: "Net Liq. and P/L YTD",
            textStyle: {
                color: theme.palette.text.primary
            }
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
				label: {
					backgroundColor: "#6a7985"
				}
			}
		},
		legend: {
            orient: "vertical",
            right: "right",
            align: "right",
            padding: [10, 100, 10, 10],
			data: ["Net Liq.", "P/L YTD"],
            textStyle: {
                color: theme.palette.text.primary
            }
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: data.date
		},
		yAxis: {
			type: "value"
		},
		series: [
			{
				name: "Net Liq.",
				type: "line",
				areaStyle: {},
				emphasis: {
					focus: "series"
				},
				data: data.netLiqValue
			},
			{
				name: "P/L YTD",
				type: "line",
				areaStyle: {},
				emphasis: {
					focus: "series"
				},
				data: data.profitLoss
			}
		],
		tooltip: {
			trigger: "axis"
		}
	};

	return <ReactECharts option={options} />;
};

export default YTDProfitLossAreaGraph;
