import { useEffect, useMemo, useState } from "react";
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
import useGraphData from "../../hooks/useGraphData";

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
  const currentBigNumberId = useSelector(
    (state: RootState) => state.bigNumbers.currentBigNumberId,
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  ChartJS.defaults.font.family = "MontSerrat";

  const [graphMonths, setGraphMonths] = useState(6);
  const [displayedYDataPoints, setDisplayedGraphMonths] = useState(6);

  const {
    oilData,
    gasData,
    opecData,
    eeData,
    oilPricesData,
    oilPricesLocalData,
    prices92,
    prices95,
    prices98,
    pricesDtl,
    pricesDtz,
  } = useGraphData(displayedYDataPoints);
  console.log(eeData);
  const oilPricesMonths = useMemo(() => {
    return {
      label: "средняя цена нефти",
      data: oilPricesData,
      borderColor: "#BADA55",
    };
  }, [oilPricesData]);

  const oilPricesLocalMonths = useMemo(() => {
    return {
      label: "средняя цена на внутренний рынок",
      data: oilPricesLocalData,
      borderColor: "#FF3131",
    };
  }, [oilPricesLocalData]);
  useEffect(() => {
    if (oilData && gasData && opecData) {
      const [oilMonths, gasMonths, opecMonths] = [
        oilData,
        gasData,
        opecData,
      ].map((data, index) => {
        let transformedData = data?.yields_per_month;

        if (index === 2) {
          transformedData = transformedData?.map((el) => Math.floor(el)) || [];
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
      let eeMonths = {};
      console.log(eeData?.data)
      if (eeData) {
        eeMonths = {
          label: "Тарифы на электроэнергию (тг/ кВт)",
          borderColor: "#FFC300",
          data: eeData?.data?.reverse().map((eeElement) => eeElement.average_price)
        }
      }

      const monthsData = {
        oil_yield: [oilMonths],
        gas_yield: [gasMonths],
        oil_prices: [oilPricesMonths, oilPricesLocalMonths],
        oil_products_yield: [],
        oil_products_prices: [
          {
            label: "92",
            data: prices92,
            borderColor: "#FFC300", // Cyber Yellow
          },
          {
            label: "95",
            data: prices95,
            borderColor: "#3B82F6", // Neon Blue
          },
          {
            label: "98",
            data: prices98,
            borderColor: "#FF6D00", // Hyper Orange
          },
          {
            label: "дтл",
            data: pricesDtl,
            borderColor: "#BADA55", // Hi-Tech Green
          },
          {
            label: "дтз",
            data: pricesDtz,
            borderColor: "#FF3131", // Red
          },
        ],
        leftover_oil_products: [],
        export: [],
        oil_stored: [],
        well_downtime: [],
        losses: [],
        energy_generation: [eeMonths],
        renewable_energy: [],
        energy_consumption: [],
        balance_flow: [],
        corporation_consumption: [],
        station_load: [],
        north_flow: [],
        west_flow: [],
        flow_middle_asia: [],
        flow_middle_asia_month: [],
        opec: [oilMonths, opecMonths],
      };
      // const myLatestDate = activeCategory === 1 ? eeData?.data[eeData?.data-1]?.data : latestDate;
      console.log()
      const data = {
        labels: getGraphLabels(
          latestDate,
          displayedYDataPoints,
          currentBigNumberId,
        ),
        datasets: monthsData[currentBigNumberId],
      };
      setChartData(data);
    }
  }, [
    activeCategory,
    bigNumberValue,
    currentBigNumberId,
    displayedYDataPoints,
    eeData,
    gasData,
    latestDate,
    oilData,
    oilPricesData,
    oilPricesLocalData,
    oilPricesLocalMonths,
    oilPricesMonths,
    opecData,
    prices92,
    prices95,
    prices98,
    pricesDtl,
    pricesDtz,
  ]);

  if (activeCategory !== 2) {
    return (
      <div className="chart-oil">
        <div className="chart-oil__select">
          <label htmlFor="minmax-buttons" className="font-bold block mb-2">
            Число{" "}
            {currentBigNumberId === "oil_products_prices" ? "дней" : "месяцев"}
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
