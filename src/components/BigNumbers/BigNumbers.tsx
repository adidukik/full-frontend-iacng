import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./BigNumbers.css";
import { useEffect, useState } from "react";
import {
  setBigNumberValue,
  setCurrentTimeRange,
  setLatestDate,
} from "./bigNumbersSlice";
import useFetchData from "../../hooks/useFetchData";
import { BigNumber } from "../../interfaces/BigNumber";
import { Category } from "../CategoriesMenu/categoriesSlice";
import { Card, Nav, Button } from "react-bootstrap";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

export const LATEST_DATE_URL = "http://192.168.0.57:8000/last_day/";

const BigNumberButton = ({ bigNumber }) => {
  const getListItem = (bigNumberData) => {
    const formattedValue = formatNumberWithSpaces(bigNumberData.value);
    return (
      <li key={bigNumberData.label} className="big-numbers__data">
        <div>
          <>{bigNumberData.label}</>
          <br></br>
          <>{formattedValue}</>
        </div>
      </li>
    );
  };
  const getTableItem = (bigNumberData) => {
    const formattedValue = formatNumberWithSpaces(bigNumberData.value);
    return (
      <tr className="big-numbers__data-table" key={bigNumberData.label}>
        <td> {bigNumberData.label}</td>
        <td> {formattedValue}</td>
      </tr>
    );
  };
  if (bigNumber.data.length < 2) {
    return (
      <>
        {bigNumber.data[0].label}{" "}
        {formatNumberWithSpaces(bigNumber.data[0].value)}
      </>
    );
  } else if (bigNumber.data.length < 3) {
    return (
      <ul className="d-flex flex-row justify-content-between">
        {bigNumber.data.map((bigNumberData) => getListItem(bigNumberData))}
      </ul>
    );
  } else {
    return (
      <table>
        <tbody>
          {bigNumber.data.map((bigNumberData) => getTableItem(bigNumberData))}
        </tbody>
      </table>
    );
  }
};

const BigNumbers = (): JSX.Element => {
  const timeRanges = ["сутки", "месяц", "год"];
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories,
  );
  const bigNumberValue = useSelector(
    (state: RootState) => state.bigNumbers.value,
  );
  const currentTimeRange = useSelector(
    (state: RootState) => state.bigNumbers.currentTimeRange,
  );
  const latestDate = useSelector(
    (state: RootState) => state.bigNumbers.latestDate,
  );
  const currentCompanyId = useSelector(
    (state: RootState) => state.auth.currentCompanyId,
  );
  const currentCompanyIdStr =
    currentCompanyId === 0 ? "" : currentCompanyId + "";
  const dispatch = useDispatch();

  const [bigNumbers, setBigNumbers] = useState<BigNumber[]>([]);

  const timeRangeToEnglish = {
    сутки: "date",
    месяц: "month",
    год: "year",
  };
  const currentTimeRangeInEnglish = timeRangeToEnglish[currentTimeRange];
  const fetchedDate: Date = useFetchData(LATEST_DATE_URL);
  useEffect(() => {
    if (fetchedDate != latestDate) {
      dispatch(setLatestDate(fetchedDate));
    }
  }, [dispatch, fetchedDate, latestDate]);

  const formattedDate = getFormattedDate(latestDate);

  const oilPlan = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_plan/${currentCompanyIdStr}`,
    ),
  );
  const oilFact = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield/${currentCompanyIdStr}`,
    ),
  );
  const gasPlan = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield_plan/${currentCompanyIdStr}`,
    ),
  );
  const gasFact = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield/${currentCompanyIdStr}`,
    ),
  );

  const benzin = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_benzin_last_${currentTimeRangeInEnglish}`,
    ),
  );
  const kerosin = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_kerosin_last_${currentTimeRangeInEnglish}`,
    ),
  );
  const dt = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_dt_last_${currentTimeRangeInEnglish}`,
    ),
  );
  const mt = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_mt_last_${currentTimeRangeInEnglish}`,
    ),
  );
  const xr = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_xr/${currentCompanyId}`,
    ),
  );
  const skv = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_skv/${currentCompanyIdStr}`,
    ),
  );
  const poteri = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_poteri/${currentCompanyIdStr}`,
    ),
  );

  useEffect(() => {
    switch (activeCategory) {
      case 0:
        const manufacturing = [
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
            title: "Добыча газа (тыс. куб. м)",
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
        ];
        if (currentCompanyId === 0) {
          setBigNumbers([
            ...manufacturing,
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
                  label: "дизель",
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
              data: [
                {
                  label: "",
                  value: 3,
                },
              ],
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
        } else {
          setBigNumbers([
            ...manufacturing,
            {
              title: "Нефть на хранении",
              data: [
                {
                  label: "факт",
                  value: xr,
                },
              ],
            },
            {
              title: "Простой скважин",
              data: [
                {
                  label: "факт",
                  value: skv,
                },
              ],
            },
            {
              title: "Потери в тоннах",
              data: [
                {
                  label: "факт",
                  value: poteri,
                },
              ],
            },
          ]);
        }

        break;
      case 1:
        setBigNumbers([
          {
            title: "Генерация (МВт)",
            data: [
              {
                label: "план",
                value: 11192,
              },
              {
                label: "факт",
                value: 11465,
              },
            ],
          },
          {
            title: "Потребление (МВт)",
            data: [
              {
                label: "план",
                value: 13360,
              },
              {
                label: "факт",
                value: 13867,
              },
            ],
          },
          {
            title: "Сальдо-переток (МВт)",
            data: [
              {
                label: "план",
                value: 2168,
              },
              {
                label: "факт",
                value: 2402,
              },
              {
                label: "±",
                value: 234,
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
                value: 36.32,
              },
              {
                label: "факт",
                value: 39.8,
              },
            ],
          },
          {
            title: "Переток Зап. зоны РК-РФ (млн.кВтч)",
            data: [
              {
                label: "план",
                value: 0.57,
              },
              {
                label: "факт",
                value: 0.19,
              },
            ],
          },
          {
            title: "Переток РК-ЦА (млн.кВтч)",
            data: [
              {
                label: "план",
                value: 1.9,
              },
              {
                label: "факт",
                value: 1.21,
              },
            ],
          },
          {
            title: "Перетоки энергосистем ЦА за 26 дней июля факт (млн.кВт.ч)",
            data: [
              {
                label: "С-до Кыргызстана (нараст)",
                value: -58.7,
              },
              {
                label: "С-до Узбекистана (нараст)",
                value: 41.0,
              },
              {
                label: "С-до РК-ЦА (нараст)",
                value: 17.7,
              },
            ],
          },
        ]);

        break;
      case 2:
        setBigNumbers([
          /*лейблы для урановой промышленности*/
        ]);
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
  return (
    <Card className="big-numbers app-card">
      <h1 className="big-numbers__heading">Данные</h1>
      <h3 className="big-numbers__date">за {formattedDate}</h3>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#сутки">
          {timeRanges.map((item, idx) => (
            <Nav.Item key={idx}>
              <Nav.Link
                href={`#${item}`}
                onClick={() => dispatch(setCurrentTimeRange(item))}
              >
                {item}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        <ul>
          {bigNumbers.map((bigNumber, index) =>
            bigNumber.data.length === 0 ? (
              <></>
            ) : (
              <li key={bigNumber.title}>
                <Button
                  variant="outline-primary"
                  className={`big-numbers__btn ${
                    bigNumberValue === index && "big-numbers__btn-active"
                  }`}
                  onClick={(e) => {
                    dispatch(setBigNumberValue(index));
                  }}
                >
                  <h5 className="big-numbers__title">{bigNumber.title}</h5>
                  <BigNumberButton bigNumber={bigNumber}></BigNumberButton>
                </Button>
              </li>
            ),
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default BigNumbers;
