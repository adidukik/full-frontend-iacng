import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import React, { useContext, useEffect, useRef, useState } from "react";

import "./Graph.css";

const Graph = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"],
      datasets: [
        {
          label: "Цена на нефть",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#ffffff",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#ffffff",
          },
        },
        y: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "#ffffff",
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#A6A6A6" }}>
      {/* <Chart type="line" data={chartData} options={chartOptions} className="chart-oil"/> */}
    </div>
  );
};

export default Graph;
