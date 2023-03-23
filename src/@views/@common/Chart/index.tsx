import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BounceTurnMotion, IntroMotion } from "@styles/keyframe";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
ChartJS.register(ArcElement);

interface ChartDataType {
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      circumference: number;
      borderColor: string;
      cutout: string;
    }
  ];
}

interface ChartItemDataType {
  name: string;
  value: number;
  totalCount: number;
  delay: number;
}

const ChartBox = (chartItemData: ChartItemDataType) => {
  const [isChartReady, setChartReady] = useState<Boolean>(false);
  const [chartData, setChartData] = useState<ChartDataType>({
    datasets: [
      {
        data: [],
        backgroundColor: [],
        circumference: 0,
        borderColor: "",
        cutout: "",
      },
    ],
  });
  const showChart = (data: ChartItemDataType) => {
    const name = data.name;
    const percent = Math.round((data.value / data.totalCount) * 100);
    setChartData({
      datasets: [
        {
          data: [percent, 100 - percent],
          backgroundColor: ["#299438", "#ccc"],
          circumference: 360,
          borderColor: "transparent",
          cutout: "85%",
        },
      ],
    });
    setChartReady(true);
  };

  useEffect(() => {
    const chartViewDelay = setTimeout(() => {
      showChart(chartItemData);
    }, chartItemData.delay);
    return () => clearTimeout(chartViewDelay);
  }, []);

  return (
    <>
      <ChartBoxUI>
        <Doughnut data={chartData} />
        <strong>
          <span>
            {chartItemData.name}
            <br />
            <em>({chartItemData.value}건)</em>
          </span>
        </strong>
      </ChartBoxUI>
    </>
  );
};

export default ChartBox;

const ChartBoxUI = styled.div`
  position: relative;
  strong {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    span {
      display: block;
      position: relative;
      flex: 1 auto;
      font-size: 1.4rem;
      transition: 0.3s;
      margin-top: 4rem;
      padding-top: 0.6rem;
      text-align: center;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 4rem;
        height: 4rem;
        margin: -4rem auto 0;
        background: url(/images/img_logo.png) no-repeat 0 0 / 100% auto;
        animation: ${BounceTurnMotion} 1s infinite;
      }
      em {
        font-size: 1.2rem;
        color: #999;
      }
    }
  }
`;
