  import { DataTable } from "primereact/datatable";
  import { Column } from "primereact/column";
  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
  import { useDispatch, useSelector } from 'react-redux'; // import hooks

  import "./Regions.css";
  // import { Button } from "primereact/button";
  import { RootState } from "../../../store";
  import { selectRegion } from './regionsSlice'


  export const regionNames = [
    "Абайская область",
    "Акмолинская область",
    "Актюбинская область",
    "Алматинская область",
    "Алматы",
    "Астана",
    "Атырауская область",
    "Восточно-Казахстанская область",
    "Жамбылская область",
    "Жетысуская область",
    "Западно-Казахстанская область",
    "Карагандинская область",
    "Костанайская область",
    "Кызылординская область",
    "Мангистауская область",
    "Павлодарская область",
    "Северо-Казахстанская область",
    "Туркестанская область",
    "Улытауская область",
    "Шымкент",
  ];

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
    return (
      <TableContainer component={Paper} className="container" sx={{backgroundColor: "#041541", padding: "0"}}>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Регион</TableCell>
              <TableCell align="right">Производство</TableCell>
              <TableCell align="right">Статус</TableCell>
              <TableCell align="right">План</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regionNames.map((region, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Button
                    variant="contained"
                    className="button"
                    onClick={() => onRegionClick(region)}
                  >
                    {region}
                  </Button>
                </TableCell>
                <TableCell align="right">10,000</TableCell>
                <TableCell align="right">Работает</TableCell>
                <TableCell align="right">100%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default Regions;