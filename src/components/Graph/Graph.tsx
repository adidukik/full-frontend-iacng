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

import { InputNumber } from "primereact/inputnumber";
import { Button } from "@mui/material";

const bigNumberValueToLabel = [["oil", "gas"], []];
const bigNumberValueToDatasetLabel = [["Добыча нефти", "Добыча газа"], []];

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
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [months, setMonths] = useState([]);
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
  const [graphMonths, setGraphMonths] = useState(6);
  const [displayedGraphMonths, setDisplayedGraphMonths] = useState(6);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.57:8000/calculate_last_x_months_${bigNumberValueToLabel[activeCategory][bigNumberValue]}_yield/${displayedGraphMonths}/`,
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("adidas", data.yields_per_month);
        setMonths(data.yields_per_month);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeCategory, bigNumberValue, displayedGraphMonths]);

  useEffect(() => {
    const data = {
      labels: months.map((el, index) => index),
      datasets: [
        {
          label: bigNumberValueToDatasetLabel[activeCategory][bigNumberValue],
          data: months,
          borderColor: "white",
          defaultFontColor: "white",
          borderWidth: 2,
        },
      ],
    };

    setChartData(data);
  }, [activeCategory, bigNumberValue, months]);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const muiStyles = {
    // Define the styles to set the text color to white
    whiteText: {
      color: "white",
    },
    blueText: {
      color: "blue",
    },
  };

  if (activeCategory === 0) {
    return (
      <div className="chart-oil">
        <div className="chart-oil__select">
          <label htmlFor="minmax-buttons" className="font-bold block mb-2">
            Число месяцев
          </label>
          <InputNumber
            inputId="minmax-buttons"
            value={graphMonths}
            onValueChange={(e) => setGraphMonths(e.value)}
            mode="decimal"
            showButtons
            min={0}
            max={100}
            className="chart-oil__input"
          />
          <Button
            style={{ fontSize: "10px", color: "white" }}
            onClick={() => setDisplayedGraphMonths(graphMonths)}
          >
            Отрисовать
          </Button>
        </div>
        <div className="chart-oil__graph-wrapper">
          {chartData.labels.length > 0 && (
            <Line data={chartData} options={options} />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Graph;
