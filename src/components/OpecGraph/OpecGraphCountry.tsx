import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphDataByCountryName } from "./opecSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { RootState } from "../../../store";
import { getLabelFromMonthYear } from "../../utils/getLabelFromMonthYear";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);
const OpecGraphCountry = () => {
  const dispatch = useDispatch();
  const currentCountry = useSelector(
    (state: RootState) => state.opec.currentCountry,
  );
  useEffect(() => {
    dispatch(fetchGraphDataByCountryName(currentCountry));
  }, [currentCountry, dispatch]);
  const graphDataByCountryName = useSelector(
    (state: RootState) => state.opec.graphDataByCountryName,
  );
  const dataPoints = graphDataByCountryName[currentCountry];

  if (dataPoints) {
    console.log(dataPoints);
    const labels = dataPoints.map((point) =>
      getLabelFromMonthYear(point.year, point.month),
    );
    const factData = dataPoints.map((point) => point.fact_b);
    const planData = dataPoints.map((point) => point.plan_b);
    const textColor = "white";
    //   "#FFC300", // Cyber Yellow
    // "#3B82F6", // Neon Blue
    // "#FF6D00", // Hyper Orange
    // "#BADA55", // Hi-Tech Green
    // "#FF3131",
    const graphColor1 = "rgba(255, 109, 0, 1)";
    const graphColor2 = "rgba(186, 218, 85, 1)";
    const lineOptions = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor, // Set the legend text color here
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          beginAtZero: false,
          ticks: {
            color: textColor,
          },
        },
        y: {
          grid: {
            display: false,
          },
          beginAtZero: true,
          ticks: {
            color: textColor,
          },
        },
      },
    };
    const chartData = {
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Добыча нефти",
          fill: false,
          lineTension: 0.1,
          backgroundColor: graphColor1,
          borderColor: graphColor1,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: graphColor1,
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: factData,
        },
        {
          type: "line" as const,

          label: "Обязательства по ОПЕК",
          fill: false,
          lineTension: 0.1,
          backgroundColor: graphColor2,
          borderColor: graphColor2,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "mitre",
          pointBorderColor: graphColor2,
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: planData,
        },
      ],
    };
    return (
      <Card className="p-3">
        <Line
          data={chartData}
          style={{ width: "100% !important" }}
          options={lineOptions}
        />
      </Card>
    );
  }
  return (
    <Card className="p-3">
      <h1 className="text-center text-slate-50">{currentCountry}</h1>
    </Card>
  );
};

export default OpecGraphCountry;
