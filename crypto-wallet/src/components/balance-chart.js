import React from "react";

import styled from "styled-components";
import ReactECharts from "echarts-for-react";

const ChartContainer = styled.div`
  width: 65%;
  height: 60vh;
`;

export default function BalanceChart(props) {
  const assetData = props.symbolList.filter((pair) => pair.select);
  const option = {
    title: {
      text: "Asset Distributed Detail",
      subtext: "Unit: $USDT (amount * price)",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: assetData.map((pair) => pair.symbol),
    },
    series: [
      {
        name: "Total Value",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: assetData.map((pair) => {
          return {
            name: pair.symbol,
            value: (pair.amount * pair.price).toFixed(4),
          };
        }),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  function onChartReady(echarts) {
    console.log("echarts is ready", echarts);
  }

  return (
    <ChartContainer>
      <ReactECharts
        option={option}
        style={{ height: 500 }}
        onChartReady={onChartReady}
      />
    </ChartContainer>
  );
}
