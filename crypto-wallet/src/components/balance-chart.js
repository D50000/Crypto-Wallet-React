import React, { useState } from "react";

import styled from "styled-components";
import ReactECharts from "echarts-for-react";

const ChartContainer = styled.div`
  width: 65%;
  height: 60vh;
`;

export default function BalanceChart() {
  const option = {
    title: {
      text: "某站点用户访问来源",
      subtext: "纯属虚构",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" },
        ],
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

  const [count, setCount] = useState(0);

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
