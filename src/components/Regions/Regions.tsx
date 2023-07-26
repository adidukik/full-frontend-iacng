  import { DataTable } from "primereact/datatable";
  import { Column } from "primereact/column";
  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
  import { useDispatch, useSelector } from 'react-redux'; // import hooks
  import { useEffect, useState } from 'react';
  import "./Regions.css";
  // import { Button } from "primereact/button";
  import { RootState } from "../../../store";
  import { selectRegion } from './regionsSlice'
import useFetchData from "../../hooks/useFetchData";


  export const regionNames = {
    "Абайская обл.": "Абайская область",
  "Акмолинская обл.": "Акмолинская область",
  "Актюбинская обл.": "Актюбинская область",
  "Алматинская обл.": "Алматинская область",
  "Алматинская обл..": "Алматы",
  "Акмолинская обл..": "Астана",
  "Атырауская обл.": "Атырауская область",
  "ВКО": "Восточно-Казахстанская область",
  "Жамбылская обл.": "Жамбылская область",
  "Жетысуская обл.": "Жетысуская область",
  "ЗКО": "Западно-Казахстанская область",
  "Карагандинская обл.": "Карагандинская область",
  "Костанайская обл.": "Костанайская область",
  "Кызылординская обл.": "Кызылординская область",
  "Мангистауская обл.": "Мангистауская область",
  "Кавлодарская обл.": "Павлодарская область",
  "СКО": "Северо-Казахстанская область",
  "Туркестанская обл.": "Туркестанская область",
  "Улытауская обл.": "Улытауская область",
  "Шымкент обл.": "Шымкент",
"ЌАЗАЌСТАН": "Казахстан",
  };

  interface RegionsProps {
    onRegionClick: (el: string) => void;
  }


  // const Regions = () => {
  //   const dispatch = useDispatch()
  //   const selectedRegion = useSelector((state: RootState) => state.regions.selectedRegion)

  //   const handleButtonClick = (region: string) => {
  //     dispatch(selectRegion(region))
  //   }

  //   return (
  //     <TableContainer component={Paper} className="container" sx={{backgroundColor: "#041541", padding: "0"}}>
  //       <Table className="table">
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>Регион</TableCell>
  //             <TableCell align="right">Производство</TableCell>
  //             <TableCell align="right">Статус</TableCell>
  //             <TableCell align="right">План</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {regionNames.map((region, index) => (
  //             <TableRow key={index}>
  //               <TableCell component="th" scope="row">
  //                 <Button
  //                   variant={region === selectedRegion ? "outlined" : "contained"}
  //                   className="button"
  //                   onClick={() => handleButtonClick(region)}
  //                 >
  //                   {region}
  //                 </Button>
  //               </TableCell>
  //               <TableCell align="right">10,000</TableCell>
  //               <TableCell align="right">Работает</TableCell>
  //               <TableCell align="right">100%</TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
  // };

  // export default Regions;


 

  const Regions = ({ onRegionClick }: RegionsProps) => {
    const parseRegionName = (fullName) => {
      const lastIndex = fullName.lastIndexOf('/');
      const regionName = fullName.substring(lastIndex + 1).trim();
      return regionName.charAt(0) + regionName.slice(1);
    };
    
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

    
    
        const regionDataFact = useFetchData(factUrl, true);
        const regionDataPlan = useFetchData(planUrl, true);
        // Convert the regionData to an array of objects for table rendering
        useEffect(() => {
        if (regionDataFact && regionDataPlan){
          const tableData = Object.keys(regionDataFact).map((region) => (
            {
            region,
            Факт: regionDataFact[region] === null ? 0 : regionDataFact[region],
            План: Math.floor(regionDataPlan[region]===null ? 0: regionDataPlan[region]), // Use 0 as default value if План data is not available
            Отклонение: (Math.floor(regionDataPlan[region]===null ? 0: regionDataPlan[region])) - regionDataFact[region], // Calculate the difference between План and Факт
            Статус: 'Работает',
          }));
          setTableData(tableData);
        }
        }, [regionDataFact, regionDataPlan]);
        
      
    

  return (
    <TableContainer component={Paper} className="container" sx={{ backgroundColor: "#041541", padding: "0" }}>
      <Table className="table">
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
              <TableCell component="th" scope="row">
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => regionNames[parseRegionName(row.region)]!="Казахстан" ? onRegionClick(regionNames[parseRegionName(row.region)]): null}
                >
                  {parseRegionName(row.region)}
                </Button>
              </TableCell>
              <TableCell align="right">{row.Факт}</TableCell>
              <TableCell align="right">{row.План}</TableCell>
              <TableCell align="right" style={{ color: row.Отклонение < 0 ? 'red' : 'green' }}>
                {row.Отклонение}
              </TableCell>
              <TableCell align="right">{row.Статус}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Regions;