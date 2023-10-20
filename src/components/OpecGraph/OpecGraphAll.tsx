import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountryCurrentOpecData } from "../../interfaces/opecSlice";
import { fetchGraphDataByCountryName } from "./opecSlice";
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
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { RootState } from "../../../store";
import LabelWithCheckbox from "./LabelWithCheckbox";
import { currentDataInteface } from "../../interfaces/opecSlice";
import { Line } from "react-chartjs-2";
import { getLabelFromMonthYear } from "../../utils/getLabelFromMonthYear";
const countryColors = {
  "Юж.Судан": "rgba(255, 109, 0, 1)",
  Бруней: "rgba(0, 128, 0, 1)",
  Бахрейн: "rgba(255, 0, 0, 1)",
  Судан: "rgba(0, 0, 128, 1)",
  Нигерия: "rgba(128, 0, 0, 1)",
  "Сауд.Аравия": "rgba(128, 128, 0, 1)",
  Кувейт: "rgba(0, 128, 128, 1)",
  Ливия: "rgba(128, 0, 128, 1)",
  Азербайджан: "rgba(0, 128, 255, 1)",
  Ирак: "rgba(128, 0, 255, 1)",
  Казахстан: "rgba(0, 255, 0, 1)",
  "Экв.Гвин": "rgba(255, 0, 128, 1)",
  Мексика: "rgba(255, 128, 0, 1)",
  Конго: "rgba(255, 0, 255, 1)",
  Габон: "rgba(128, 128, 128, 1)",
  Ангола: "rgba(0, 0, 0, 1)",
  Алжир: "rgba(192, 192, 192, 1)",
  Россия: "rgba(255, 255, 255, 1)",
  Оман: "rgba(64, 128, 255, 1)",
  Венесуэла: "rgba(128, 0, 64, 1)",
  Иран: "rgba(255, 0, 64, 1)",
  ОАЭ: "rgba(255, 128, 64, 1)",
  Малайзия: "rgba(255, 192, 0, 1)",
};

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
const textColor = "rgba(255,255,255,1)";
const lineOptions = {
  responsive: false,
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
      beginAtZero: false,
      ticks: {
        color: textColor,
      },
    },
  },
};
const graphColor1 = "rgba(255, 109, 0, 1)";

const OpecGraphCountry = () => {
  const dispatch = useDispatch();
  const currentData: currentDataInteface = useSelector(
    (state: RootState) => state.opec.currentData,
  );
  const chosenCountries = useSelector(
    (state: RootState) => state.opec.chosenCountries,
  );
  for (const country of chosenCountries) {
    dispatch(fetchGraphDataByCountryName(country));
  }
  const graphDataByCountryName = useSelector(
    (state: RootState) => state.opec.graphDataByCountryName,
  );
  const [oilShow, setOilShow] = useState(true);
  const [quotaShow, setQuotaShow] = useState(false);
  const graphDatasets = [];
  const labels = graphDataByCountryName["Казахстан"]?.map((point) =>
    getLabelFromMonthYear(point.year, point.month),
  );

  for (const countryName of chosenCountries) {
    const dataPoints = graphDataByCountryName[countryName];
    if (dataPoints) {
      const factData = dataPoints.map((point) => point.fact_b);
      const planData = dataPoints.map((point) => point.plan_b);
      const quotaData = dataPoints.map((point) => point.quota_b);
      const commonProps = {
        type: "line",
        fill: false,
        lineTension: 0.1,
        backgroundColor: countryColors[countryName],
        borderColor: countryColors[countryName],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: countryColors[countryName],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      };
      if (oilShow) {
        graphDatasets.push({
          ...commonProps,
          label: countryName + "(добыча нефти)",
          data: factData,
        });
      }
      if (quotaShow) {
        graphDatasets.push({
          ...commonProps,
          label: countryName + "(запас квоты)",
          data: planData,
        });
      }
    }
  }
  const chartData = {
    labels,
    datasets: graphDatasets,
  };

  return (
    <div className="d-flex h-100 justify-content-between flex-row align-items-center text-white">
      <div className="card">
        <Line
          data={chartData}
          width={800}
          height={250}
          options={lineOptions}
          style={{
            margin: "0 auto",
          }}
        />
      </div>

      <div className="d-flex card flex-column h-100 w-48 border-primary p-4 border-left">
        <FormControl component="fieldset" className="!flex flex-row">
          <FormControlLabel
            control={
              <Checkbox
                checked={oilShow}
                onChange={() => setOilShow(!oilShow)}
                style={{
                  color: "#fff",
                }}
              />
            }
            label="Добыча нефти"
            className="w-19"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={quotaShow}
                onChange={() => setQuotaShow(!quotaShow)}
                style={{
                  color: "#fff",
                }}
              />
            }
            label="Квота"
            className="w-19"
          />
        </FormControl>

        <FormControl
          component="fieldset"
          className="overflow-y-auto text-slate-50"
          sx={{
            height: "100%",
          }}
        >
          ОПЕК
          {currentData?.countries_o?.map((el: CountryCurrentOpecData) => (
            <LabelWithCheckbox el={el} />
          ))}
          ОПЕК+
          {currentData?.countries_o_plus?.map((el: CountryCurrentOpecData) => (
            <LabelWithCheckbox el={el} />
          ))}
        </FormControl>
      </div>
    </div>
  );
};

export default OpecGraphCountry;
