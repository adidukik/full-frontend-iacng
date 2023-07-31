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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

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
  const bigNumberValue = useSelector(
    (state: RootState) => state.bigNumbers.value,
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [months, setMonths] = useState({});
  ChartJS.defaults.font.family = "MontSerrat";
  const options = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#fff",
          // This more specific font property overrides the global property
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: "Добыча",
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // Change this color to your desired font color
        },
      },
      y: {
        ticks: {
          color: "#fff", // Change this color to your desired font color
        },
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
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
      datasets: [
        {
          label: "Добыча нефти",
          data: [
            months[7],
            months[8],
            months[9],
            months[10],
            months[11],
            months[12],
          ],
          borderColor: "white",
          defaultFontColor: "white",
          borderWidth: 2,
        },
      ],
    };

    setChartData(data);
  }, [months]);
  if (bigNumberValue === 0) {
    return (
      <div className="chart-oil">
        {chartData.labels.length > 0 && (
          <Line data={chartData} options={options} />
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Graph;
