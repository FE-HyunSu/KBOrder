import React, { useEffect, useState } from "react";
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
const ChartBox = ({ chartvalue }: any) => {
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
  const showChart = (percent: number) => {
    setChartData({
      datasets: [
        {
          data: [100 - percent, percent],
          backgroundColor: ["#ee5a52", "#1f8ecd"],
          circumference: 360,
          borderColor: "transparent",
          cutout: "70%",
        },
      ],
    });
    setChartReady(true);
  };

  useEffect(() => {
    showChart(chartvalue);
  }, []);

  return (
    <>
      <Doughnut data={chartData} />
    </>
  );
};

export default ChartBox;
