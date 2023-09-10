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
import { Button, getAccordionSummaryUtilityClass } from "@mui/material";
import { Category } from "../CategoriesMenu/categoriesSlice";
import { getGraphLabels } from "../../utils/getGraphLabels";
import useFetchData from "../../hooks/useFetchData";

//  "#FFC300", // Cyber Yellow
//   "#3B82F6", // Neon Blue
//   "#FF6D00", // Hyper Orange
//   "#BADA55", // Hi-Tech Green
//   "#FF3131",

const datasetOptions = [
  {
    label: "Добыча нефти",
    color: "#FFC300",
  },
  {
    label: "Добыча газа",
    color: "#3B82F6",
  },
  {
    label: "ОПЕК+",
    color: "#FF6D00",
  },
];
const graphOptions = {
  maintainAspectRatio: false,
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#fff",
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
        beginAtZero: true,
        color: "#fff", // Change this color to your desired font color
      },
    },
  },
};
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
  const latestDate = useSelector(
    (state: RootState) => state.bigNumbers.latestDate,
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  ChartJS.defaults.font.family = "MontSerrat";

  const [graphMonths, setGraphMonths] = useState(6);
  const [displayedGraphMonths, setDisplayedGraphMonths] = useState(6);

  const yieldUrls = ["oil", "gas", "opec"].map(
    (yieldType) =>
      `http://192.168.0.57:8000/calculate_last_x_months_${yieldType}_yield/${displayedGraphMonths}`,
  );
  const oilData = useFetchData(yieldUrls[0], true);
  const gasData = useFetchData(yieldUrls[1], true);
  const opecData = useFetchData(yieldUrls[2], true);
  useEffect(() => {
    if (oilData && gasData && opecData) {
      const [oilMonths, gasMonths, opecMonths] = [
        oilData,
        gasData,
        opecData,
      ].map((data, index) => {
        let transformedData = data?.yields_per_month;

        if (index === 2) {
          transformedData =
            transformedData?.map((el) => Math.floor(el * 1000)) || [];
        }

        return {
          label: datasetOptions[index].label,
          data: transformedData,
        };
      });
      const monthsArray = [oilMonths, gasMonths, opecMonths];
      monthsArray.forEach((months, index) => {
        let pointColors = [];
        if (index === 0 && activeCategory === 3) {
          for (let i = 0; i < oilMonths.data.length; i++) {
            pointColors.push(
              opecMonths.data[i] < months.data[i]
                ? "#FF0000"
                : datasetOptions[index].color,
            );
          }
        } else {
          pointColors = Array(months.data.length).fill(
            datasetOptions[index].color,
          );
        }
        months.borderColor = datasetOptions[index].color;
        months.backgroundColor = pointColors;
      });
     
      const bigNumberValueToMonthsData = [
        [[oilMonths], [gasMonths]],
        [[]],
        [[]],
        [[oilMonths, opecMonths]],
      ];
      const data = {
        labels: getGraphLabels(latestDate, displayedGraphMonths),
        datasets: bigNumberValueToMonthsData[activeCategory][bigNumberValue],
      };
      setChartData(data);
    }
  }, [
    activeCategory,
    bigNumberValue,
    displayedGraphMonths,
    gasData,
    latestDate,
    oilData,
    opecData,
  ]);

  if (activeCategory === 0 || activeCategory === 3) {
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
          {chartData && <Line data={chartData} options={graphOptions} />}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Graph;
