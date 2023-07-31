import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux"; // import hooks
import { useEffect, useMemo, useState } from "react";
import "./Regions.css";
import { RootState } from "../../../store";
import useFetchData from "../../hooks/useFetchData";
import RegionsTableCell from "./RegionsTableCell";
import { parseRegionName } from "../../utils/parseRegionName";
import { Category } from "../CategoriesMenu/categoriesSlice";

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

interface RegionsProps {
  onRegionClick: (el: string) => void;
}
const Regions = ({ onRegionClick }: RegionsProps) => {
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );

  const currentTimeRange = useSelector(
    (state: RootState) => state.bigNumbers.currentTimeRange,
  );
  const timeRangeToEnglish = {
    сутки: "day",
    месяц: "month",
    год: "year",
  };
  const currentTimeRangeInEnglish = timeRangeToEnglish[currentTimeRange];
  const factUrl = `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_by_regions/`;
  const planUrl = `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_by_regions_plan/`;
  // State to store table data
  const [tableData, setTableData] = useState([]);
  const showDiffElems = ["Отклонение"];
  const regionDataFact = useFetchData(factUrl, true);
  const regionDataPlan = useFetchData(planUrl, true);
  // Convert the regionData to an array of objects for table rendering
  useEffect(() => {
    if (activeCategory == 0) {
      if (regionDataFact && regionDataPlan) {
        const tableData = Object.keys(regionDataFact).map((region) => ({
          region: parseRegionName(region),
          Факт: regionDataFact[region] === null ? 0 : regionDataFact[region],
          План: Math.floor(
            regionDataPlan[region] === null ? 0 : regionDataPlan[region],
          ), // Use 0 as default value if План data is not available
          Отклонение:
            Math.floor(
              regionDataPlan[region] === null ? 0 : regionDataPlan[region],
            ) - regionDataFact[region], // Calculate the difference between План and Факт
          Статус: "Работает",
        }));
        setTableData(tableData);
      }
    } else {
      const tableData = [
        {
          Станция: "ТОО Экиб. ГРЭС-1",
          План: 2210,
          Факт: 2210,
          Отклонение: 0,
          Статус: "работает",
        },
        {
          Станция: "АО Экиб. ГРЭС-2",
          План: 430,
          Факт: 430,
          Отклонение: 0,
          Статус: "работает",
        },
        {
          Станция: "АО ЕЭК(АксуЭС)",
          План: 1540,
          Факт: 1470,
          Отклонение: -70,
          Статус: "работает",
        },
        {
          Станция: "АО Жамбылская ГРЭС",
          План: 350,
          Факт: 350,
          Отклонение: 0,
          Статус: "работает",
        },
        {
          Станция: "Карагандинская ГРЭС-2",
          План: 436,
          Факт: 436,
          Отклонение: 0,
          Статус: "работает",
        },
        {
          Станция: "Бухтарминская ГЭС",
          План: 247,
          Факт: 380,
          Отклонение: 133,
          Статус: "работает",
        },
        {
          Станция: "Усть-Каменогорская ГЭС",
          План: 147,
          Факт: 147,
          Отклонение: 0,
          Статус: "работает",
        },
        {
          Станция: "Шульбинская ГЭС",
          План: 148,
          Факт: 148,
          Отклонение: 0,
          Статус: "работает",
        },
      ];
      setTableData(tableData);
    }
  }, [activeCategory, regionDataFact, regionDataPlan]);

  const getHandleClick = (row) => {
    if (activeCategory == 0) {
      return () => {
        return regionNames[parseRegionName(row.region)] !== "Казахстан"
          ? onRegionClick(regionNames[row.region])
          : null;
      };
    } else {
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
            <TableCell>Регион</TableCell>
            <TableCell align="right">Факт</TableCell>
            <TableCell align="right">План</TableCell>
            <TableCell align="right">Отклонение</TableCell>
            <TableCell align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {Object.entries(row).map(
                ([rowKey, rowData]: [string, number], index) =>
                  index ? (
                    <RegionsTableCell
                      key={index}
                      rowData={rowData}
                      showDiff={
                        showDiffElems.indexOf(rowKey) === -1 ? false : true
                      }
                    />
                  ) : (
                    <RegionsTableCell
                      key={index}
                      rowData={rowData}
                      isButton={true}
                      onClick={getHandleClick(row)}
                    />
                  ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Regions;
