import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; // import hooks
import { useEffect, useMemo, useState } from "react";
import "./Regions.css";
import { RootState } from "../../../store";
import useFetchData from "../../hooks/useFetchData";
import RegionsTableCell from "./RegionsTableCell";
import { parseRegionName } from "../../utils/parseRegionName";
import { Category } from "../CategoriesMenu/categoriesSlice";
import { selectRegion } from "./regionsSlice";
import plantsData from "../../assets/geo/power_plants.json";
import GeoJSON from "ol/format/GeoJSON";

export const regionNames = {
  "Абайская обл.": "Абайская область",
  "Акмолинская обл.": "Акмолинская область",
  "Актюбинская обл.": "Актюбинская область",
  "Алматинская обл.": "Алматинская область",
  "Алматинская обл..": "Алматы",
  "Акмолинская обл..": "Астана",
  "Атырауская обл.": "Атырауская область",
  ВКО: "Восточно-Казахстанская область",
  "Жамбылская обл.": "Жамбылская область",
  "Жетысуская обл.": "Жетысуская область",
  ЗКО: "Западно-Казахстанская область",
  "Карагандинская обл.": "Карагандинская область",
  "Костанайская обл.": "Костанайская область",
  "Кызылординская обл.": "Кызылординская область",
  "Мангистауская обл.": "Мангистауская область",
  "Кавлодарская обл.": "Павлодарская область",
  СКО: "Северо-Казахстанская область",
  "Туркестанская обл.": "Туркестанская область",
  "Улытауская обл.": "Улытауская область",
  "Шымкент обл.": "Шымкент",
  ЌАЗАЌСТАН: "Казахстан",
};
const format = new GeoJSON();
const Regions = () => {
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useDispatch();
  const onRegionClick = (region) => {
    dispatch(selectRegion(region));
  };
  const currentTimeRange = useSelector(
    (state: RootState) => state.bigNumbers.currentTimeRange
  );
  const bigNumberValue = useSelector(
    (state: RootState) => state.bigNumbers.value
  );
  const currentBigNumberId = useSelector(
    (state: RootState) => state.bigNumbers.currentBigNumberId
  );
  const renewablePlants = useSelector(
    (state: RootState) => state.map.renewablePlants
  );
  const timeRangeToEnglish = {
    сутки: "day",
    месяц: "month",
    год: "year",
  };
  const bigNumberToType = ["oil", "gas"];
  const yieldType = bigNumberToType[bigNumberValue];
  const currentTimeRangeInEnglish = timeRangeToEnglish[currentTimeRange];
  const factUrl = `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_${yieldType}_yield_by_regions/`;
  const planUrl = `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_${yieldType}_yield_by_regions_plan/`;
  // State to store table data
  const [tableData, setTableData] = useState([]);
  const showDiffElems = ["Отклонение"];
  const regionDataFact = useFetchData(factUrl, true);
  const regionDataPlan = useFetchData(planUrl, true);
  // Convert the regionData to an array of objects for table rendering
  useEffect(() => {
    if (activeCategory === 0) {
      if (regionDataFact && regionDataPlan) {
        const tableData = Object.keys(regionDataFact).map((region) => ({
          Регион: parseRegionName(region),
          Факт: regionDataFact[region] === null ? 0 : regionDataFact[region],
          План: Math.floor(
            regionDataPlan[region] === null ? 0 : regionDataPlan[region]
          ), // Use 0 as default value if План data is not available
          Отклонение:
            regionDataFact[region] -
            Math.floor(
              regionDataPlan[region] === null ? 0 : regionDataPlan[region]
            ), // Calculate the difference between План and Факт
          Статус: "Работает",
        }));
        setTableData(tableData);
      }
    } else if (activeCategory === 1) {
      let tableData = [];
      if (
        currentBigNumberId === "renewable_energy" &&
        renewablePlants.length !== 0
      ) {
        let features = format.readFeatures(plantsData);
        const renewablePlantsSet = new Set();
        for (const renewablePlant of renewablePlants) {
          renewablePlantsSet.add(renewablePlant);
        }
        features = features.filter((feature) =>
          renewablePlantsSet.has(feature.get("id"))
        );
        tableData = features.map((feature) => ({
          Станция: feature.get("name"),
          Тип: feature.get("type"),
          Компания: feature.get("company"),
          id: feature.get("id"),
        }));
      } else {
        tableData = [
          {
            Станция: "ТОО Экиб. ГРЭС-1",
            План: 2210,
            Факт: 2210,
            Отклонение: 0,
            Статус: "работает",
            id: 13
          },
          {
            Станция: "АО Экиб. ГРЭС-2",
            План: 430,
            Факт: 430,
            Отклонение: 0,
            Статус: "работает",
            id: 5
          },
          {
            Станция: "АО ЕЭК(АксуЭС)",
            План: 1540,
            Факт: 1470,
            Отклонение: -70,
            Статус: "работает",
            id: 30
          },
          {
            Станция: "АО Жамбылская ГРЭС",
            План: 350,
            Факт: 350,
            Отклонение: 0,
            Статус: "работает",
            id: 25
          },
          {
            Станция: "Карагандинская ГРЭС-2",
            План: 436,
            Факт: 436,
            Отклонение: 0,
            Статус: "работает",
            id: 39
          },
          {
            Станция: "Бухтарминская ГЭС",
            План: 247,
            Факт: 380,
            Отклонение: 133,
            Статус: "работает",
            id: 17
          },
          {
            Станция: "Усть-Каменогорская ГЭС",
            План: 147,
            Факт: 147,
            Отклонение: 0,
            Статус: "работает",
            id: 7
          },
          {
            Станция: "Шульбинская ГЭС",
            План: 148,
            Факт: 148,
            Отклонение: 0,
            Статус: "работает",
            id: 35
          },
        ];
      }

      setTableData(tableData);
    } else {
      setTableData([]);
    }
  }, [
    activeCategory,
    currentBigNumberId,
    regionDataFact,
    regionDataPlan,
    renewablePlants,
  ]);

  const getHandleClick = (row) => {
    if (activeCategory === 0) {
      return () => {
        return regionNames[parseRegionName(row.region)] !== "Казахстан"
          ? onRegionClick(regionNames[row.region])
          : null;
      };
    } else if (currentBigNumberId === "energy_generation" || currentBigNumberId === "renewable_energy") {
      return () => {
        return onRegionClick(row.id);
      };
    }
    {
      return () => {
        console.log("Other categ");
      };
    }
  };
  return (
    <TableContainer
      component={Paper}
      className="container"
      sx={{ backgroundColor: "#041541", padding: "0", height: "100%" }}
    >
      <Table className="table" sx={{ height: "100%" }}>
        <TableHead>
          <TableRow>
            {tableData[0] &&
              Object.entries(tableData[0]).map(
                ([rowKey, rowData]: [string, number], index) => {
                  const tableCellProps = {};
                  if (index) tableCellProps.align = "right";
                  if (rowKey === "id") return <></>;
                  return <TableCell {...tableCellProps} key={rowKey}>{rowKey}</TableCell>;
                }
              )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {Object.entries(row).map(
                ([rowKey, rowData]: [string, number], index) => {
                  const regionsTableCellProps = {
                    key: index,
                    rowData: rowData,
                    showDiff: false,
                    onClick: null,
                  };
                  if (index) {
                    regionsTableCellProps.showDiff =
                      showDiffElems.indexOf(rowKey) === -1 ? false : true;
                  } else {
                    regionsTableCellProps.onClick = getHandleClick(row);
                  }
                  if (rowKey === "id") {
                    return <></>;
                  }
                  return <RegionsTableCell {...regionsTableCellProps} />;
                }
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Regions;
