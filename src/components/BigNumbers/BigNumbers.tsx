// import { Button } from 'primereact/button';
// import { Chart } from 'primereact/chart';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { Menu } from 'primereact/menu';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { TabMenu } from 'primereact/tabmenu';

// import { Card } from 'primereact/card';
// import './BigNumbers.css';

// interface BigNumbersProps {
// }

// const items: MenuItem[] = [
//   {label: 'сутки'},
//   {label: 'месяц'},
//   {label: 'год'},
// ];

// const BigNumbers: React.FC<BigNumbersProps> = (props) => {
//   const labels = [
//     "Добыча нефти (тонн) план - 146125 факт 145000",
//     "Добыча газа",
//     "Производство нефтепродуктов",
//     "Остаток НП (дни)",
//     "Экспорт нефти %, нефтепродуктов %",
//     "Цены на нефть, внутренний рынок - 40, на экспорт - 40 Бензин 92 РК - 203"
//   ];

//   return (
//     <div className="card">
//       <TabMenu model={items} className="time-tabmenuitem"/>

//       <ul>
//         {labels.map
//               (label =>
//               <li key = {label}>
//                 <Button label={label} className="p-button-raised p-button-text"/>
//               </li>)}
//       </ul>
//     </div>

//   );
// };

// export default BigNumbers;

import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button, Card, Nav } from "react-bootstrap";
import "./BigNumbers.css";
import React, { useEffect, useState } from "react";
import { setBigNumbers } from "./bigNumbersSlice";

interface BigNumbersProps {}

const BigNumbers: React.FC<BigNumbersProps> = (props) => {
  const timeRanges = ["сутки", "месяц", "год"];
  const [currentTimeRange, setCurrentTimeRange] = useState(timeRanges[0]); // State to store active tab
  const activeCategory = useSelector((state: RootState) => state.categories);

  // let labels = getLabelsForCategory(activeCategory, 0);  // Implement this function to return labels based on category

  const [oilPlan, setNumberData] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTimeRangeToUrl = {
          сутки: "http://192.168.0.57:8000/calculate_last_date_oil_yield_plan/",
          месяц:
            "http://192.168.0.57:8000/calculate_last_month_oil_yield_plan/",
          год: "http://192.168.0.57:8000/calculate_last_year_oil_yield_plan/",
        };
        const response = await fetch(currentTimeRangeToUrl[currentTimeRange]); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNumberData(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentTimeRange]);

  const [oilFact, setOilPlan] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTimeRangeToUrl = {
          сутки: "http://192.168.0.57:8000/calculate_last_date_oil_yield/",
          месяц: "http://192.168.0.57:8000/calculate_last_month_oil_yield/",
          год: "http://192.168.0.57:8000/calculate_last_year_oil_yield/",
        };
        const response = await fetch(currentTimeRangeToUrl[currentTimeRange]); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOilPlan(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentTimeRange]);

  const [gasFact, setGas] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTimeRangeToUrl = {
          сутки: "http://192.168.0.57:8000/calculate_last_date_gas_yield/",
          месяц: "http://192.168.0.57:8000/calculate_last_month_gas_yield/",
          год: "http://192.168.0.57:8000/calculate_last_year_gas_yield/",
        };
        const response = await fetch(currentTimeRangeToUrl[currentTimeRange]); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGas(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentTimeRange]);

  const [gasPlan, setGasPlan] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTimeRangeToUrl = {
          сутки: "http://192.168.0.57:8000/calculate_last_date_gas_yield_plan/",
          месяц:
            "http://192.168.0.57:8000/calculate_last_month_gas_yield_plan/",
          год: "http://192.168.0.57:8000/calculate_last_year_gas_yield_plan/",
        };
        const response = await fetch(currentTimeRangeToUrl[currentTimeRange]); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGasPlan(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentTimeRange]);

  const [benzin, setBenzin] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.57:8000/calculate_benzin/"
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBenzin(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [kerosin, setKerosin] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.57:8000/calculate_kerosin/"
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setKerosin(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [dt, setDt] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.57:8000/calculate_dt/"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDt(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [mt, setMt] = useState<number | null>(null); // State to store the fetched number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.57:8000/calculate_mt/"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMt(Object.values(data)[0]);
        console.log(Object.values(data)[0]); // Assuming the API response is an object with a "number" property
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [labels, setLabels] = useState<string[]>([]);
  useEffect(() => {
    switch (activeCategory) {
      case "нефтегазовая отрасль":
        setLabels([
          `Добыча нефти (тонн) <br> план - ${Math.floor(oilPlan)} <br> факт ${oilFact}`,
          `Добыча газа (тонн) план - ${Math.floor(gasPlan)} факт ${gasFact}`,
          `Производство нефтепродуктов: бензин - ${benzin}, керосин - ${kerosin}, дизельное топливо - ${dt}, мазут - ${mt}`,
          "Остаток НП (дни)",
          "Экспорт нефти %, нефтепродуктов %",
          "Цены на нефть, внутренний рынок - 40, на экспорт - 40 Бензин 92 РК - 203",
        ]);
        break;
      case "электроэнергетика":
        setLabels(["Производство электроэнергии план - 146125 факт 145000"]);
        break;
      case "урановая промышленность":
        setLabels([
          /*лейблы для урановой промышленности*/
        ]);
        break;
      default:
        setLabels([
          `Добыча нефти (тонн) план - ${Math.floor(oilPlan)} факт ${oilFact}`,
          `Добыча газа (тонн) план - ${Math.floor(gasPlan)} факт ${gasFact}`,
          `Производство нефтепродуктов: бензин - ${benzin}, керосин - ${kerosin}, дизельное топливо - ${dt}, мазут - ${mt}`,
          "Остаток НП (дни)",
          "Экспорт нефти %, нефтепродуктов %",
          "Цены на нефть, внутренний рынок - 40, на экспорт - 40 Бензин 92 РК - 203",
        ]);
    }
  }, [
    activeCategory,
    oilPlan,
    oilFact,
    gasPlan,
    gasFact,
    benzin,
    kerosin,
    dt,
    mt,
  ]);

  // console.log(labels);
  return (
    <Card className="big-numbers app-card">
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#сутки">
          {timeRanges.map((item, idx) => (
            <Nav.Item key={idx}>
              <Nav.Link
                href={`#${item}`}
                onClick={() => setCurrentTimeRange(item)}
              >
                {item}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        <ul>
          {labels.map((label, index) => (
            <li key={label}>
              <Button
                variant="outline-primary"
                className="big-numbers__btn"
                onClick={(e) => {
                  setBigNumbers(index);
                }}
              >
                {/* {label} */}
                <p dangerouslySetInnerHTML={{ __html: label }} />
              </Button>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

// Implement this function to return different labels based on category
function getLabelsForCategory(category: string, numberData: number | null) {}

export default BigNumbers;
