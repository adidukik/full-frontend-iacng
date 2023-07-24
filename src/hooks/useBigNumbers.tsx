import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useFetchData from "./useFetchData";
import { useEffect, useState } from "react";
import { BigNumber } from "../interfaces/BigNumber";

function useBigNumbers(currentTimeRange: string) {
  const activeCategory = useSelector((state: RootState) => state.categories);
  const [bigNumbers, setBigNumbers] = useState<BigNumber[]>([]);
  switch (activeCategory) {
    case "нефтегазовая отрасль":
      const timeRangeToEnglish = {
        сутки: "date",
        месяц: "month",
        год: "year",
      };
      const currentTimeRangeInEnglish = timeRangeToEnglish[currentTimeRange];

      const oilPlan = useFetchData(
        `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_plan/`
      );
      const oilFact = useFetchData(
        `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield/`
      );
      const gasPlan = useFetchData(
        `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield_plan/`
      );
      const gasFact = useFetchData(
        `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield/`
      );

      const benzin = useFetchData(`http://192.168.0.57:8000/calculate_benzin/`);
      const kerosin = useFetchData(
        `http://192.168.0.57:8000/calculate_kerosin/`
      );
      const dt = useFetchData(`http://192.168.0.57:8000/calculate_dt/`);
      const mt = useFetchData(`http://192.168.0.57:8000/calculate_mt/`);

      useEffect(() => {
        setBigNumbers([
          {
            title: "Добыча нефти (тонн)",
            data: [
              {
                label: "план",
                value: oilPlan,
              },
              {
                label: "факт",
                value: oilFact,
              },
            ],
          },
          {
            title: "Добыча газа (тонн)",
            data: [
              {
                label: "план",
                value: gasPlan,
              },
              {
                label: "факт",
                value: gasFact,
              },
            ],
          },
          {
            title: "Производство нефтепродуктов",
            data: [
              {
                label: "бензин",
                value: benzin,
              },
              {
                label: "керосин",
                value: kerosin,
              },
              {
                label: "дизельное топливо",
                value: dt,
              },
              {
                label: "мазут",
                value: mt,
              },
            ],
          },
          {
            title: "Остаток НП (дни)",
            data: [],
          },
          {
            title: "Экспорт",
            data: [
              {
                label: "нефти",
                value: 0,
              },
              {
                label: "нефтепродуктов",
                value: 0,
              },
            ],
          },
          {
            title: "Цены на нефть",
            data: [
              {
                label: "внутренний рынок",
                value: 40,
              },
              {
                label: "на экспорт",
                value: 40,
              },
              {
                label: "Бензин",
                value: 92,
              },
              {
                label: "РК",
                value: 203,
              },
            ],
          },
        ]);
      }, []);

      return bigNumbers;
      break;
    case "электроэнергетика":
      // setLabels(["Производство электроэнергии план - 146125 факт 145000"]);
      break;
    case "урановая промышленность":
      // setLabels([
      //   /*лейблы для урановой промышленности*/
      // ]);
      break;
    default:
  }
}

export default useBigNumbers;
