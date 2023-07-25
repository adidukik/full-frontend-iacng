import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Graph.css";

const Graph = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [months, setMonths] = useState({});
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Добыча",
      },
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.57:8000/calculate_last_x_months_oil_yield/12/",
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMonths(data.yields_per_month);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
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
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };

    setChartData(data);
  }, [months]);

  return (
    <div className="chart-oil">
      {chartData.labels.length > 0 && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default Graph;
