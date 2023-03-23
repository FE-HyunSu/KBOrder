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

interface ChartItemDataType {
  name: string;
  value: number;
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
    const percent = data.value;
    setChartData({
      datasets: [
        {
          data: [percent, 100 - percent],
          backgroundColor: ["#299438", "#ccc"],
          circumference: 360,
          borderColor: "transparent",
          cutout: "75%",
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
      <Doughnut data={chartData} />
    </>
  );
};

export default ChartBox;
