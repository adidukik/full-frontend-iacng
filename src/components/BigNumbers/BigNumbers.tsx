import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./BigNumbers.css";
import { useEffect, useState } from "react";
import { setBigNumberValue } from "./bigNumbersSlice";
import useFetchData from "../../hooks/useFetchData";
import { BigNumber } from "../../interfaces/BigNumber";
import { Category } from "../CategoriesMenu/categoriesSlice";
import { Card, Nav, Button } from "react-bootstrap";

const BigNumbers = (): JSX.Element => {
  const timeRanges = ["сутки", "месяц", "год"];
  const [currentTimeRange, setCurrentTimeRange] = useState(timeRanges[0]); // State to store active tab
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );

  // Access dispatch to dispatch actions
  const dispatch = useDispatch();

  const [bigNumbers, setBigNumbers] = useState<BigNumber[]>([]);

  const timeRangeToEnglish = {
    сутки: "date",
    месяц: "month",
    год: "year",
  };
  const currentTimeRangeInEnglish = timeRangeToEnglish[currentTimeRange];

  const oilPlan = useFetchData(
    `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_plan/`,
  );
  const oilFact = useFetchData(
    `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield/`,
  );
  const gasPlan = useFetchData(
    `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield_plan/`,
  );
  const gasFact = useFetchData(
    `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield/`,
  );

  const benzin = useFetchData(`http://192.168.0.57:8000/calculate_benzin/`);
  const kerosin = useFetchData(`http://192.168.0.57:8000/calculate_kerosin/`);
  const dt = useFetchData(`http://192.168.0.57:8000/calculate_dt/`);
  const mt = useFetchData(`http://192.168.0.57:8000/calculate_mt/`);
  useEffect(() => {
    switch (activeCategory) {
      case "нефтегазовая отрасль":
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

        break;
      case "электроэнергетика":
        setBigNumbers([
          {
            title: "Генерация (МВт)",
            data: [
              {
                label: "план",
                value: 11506,
              },
              {
                label: "факт",
                value: 12319,
              },
            ],
          },
          {
            title: "Потребление (МВт)",
            data: [
              {
                label: "план",
                value: 11561,
              },
              {
                label: "факт",
                value: 12656,
              },
            ],
          },
          {
            title: "Сальдо-переток (МВт)",
            data: [
              {
                label: "план",
                value: 55,
              },
              {
                label: "факт",
                value: 337,
              },
            ],
          },
          {
            title: "Потребление крупных предприятий Казахстана",
            data: [],
          },
          {
            title: "Нагрузка эл. станций национального значения",
            data: [],
          },
          {
            title: "Переток Сев. зоны РК-РФ (млн.кВтч)",
            data: [
              {
                label: "план",
                value: 3.61,
              },
              {
                label: "факт",
                value: -3.68,
              },
            ],
          },
          {
            title: "Переток Зап. зоны РК-РФ (млн.кВтч)",
            data: [
              {
                label: "план",
                value: 1.18,
              },
              {
                label: "факт",
                value: 1.13,
              },
            ],
          },
          {
            title: "Переток РК-ЦА (млн.кВтч)",
            data: [
              {
                label: "план",
                value: 0.0,
              },
              {
                label: "факт",
                value: 11.42,
              },
            ],
          },
          {
            title: "Перетоки энергосистем ЦА за 13 дней июня факт (млн.кВт.ч)",
            data: [
              {
                label: "С-до Кыргызстана (нараст)",
                value: -13.1,
              },
              {
                label: "С-до Узбекистана (нараст)",
                value: 0.4,
              },
              {
                label: "С-до РК-ЦА (нараст)",
                value: 12.7,
              },
            ],
          },
        ]);

        break;
      case "урановая промышленность":
        // setLabels([
        //   /*лейблы для урановой промышленности*/
        // ]);
        break;
      default:
        console.log();
    }
  }, [
    activeCategory,
    benzin,
    dt,
    gasFact,
    gasPlan,
    kerosin,
    mt,
    oilFact,
    oilPlan,
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
          {bigNumbers.map((bigNumber, index) => (
            <li key={bigNumber.title}>
              <Button
                variant="outline-primary"
                className="big-numbers__btn"
                onClick={(e) => {
                  dispatch(setBigNumberValue(index));
                }}
              >
                <h5 className="big-numbers__title">{bigNumber.title}</h5>
                <ul>
                  {bigNumber.data.map((bigNumberData) => (
                    <li key={bigNumberData.label} className="big-numbers__data">
                      {bigNumberData.label}: {bigNumberData.value}
                    </li>
                  ))}
                </ul>
              </Button>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default BigNumbers;
