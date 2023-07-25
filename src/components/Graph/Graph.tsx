import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import React, { useContext, useEffect, useRef, useState } from "react";

import "./Graph.css";

const Graph = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [months, setMonths] = useState({}); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.57:8000/calculate_last_x_months_oil_yield/12/",
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const months1 = await response.json();
        setMonths(months1.yields_per_month);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary",
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"],
      datasets: [
        {
          label: "Добыча нефти",
          data: [
            months[0],
            months[1],
            months[2],
            months[3],
            months[4],
            months[5],
            months[6],
          ],
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
  }, [months]);
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#A6A6A6" }}>
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        className="chart-oil"
      />
    </div>
  );
};

export default Graph;
