import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./BigNumbers.css";
import { useEffect, useState } from "react";
import {
  BigNumberTimeRange,
  setBigNumberId,
  setBigNumberValue,
  setCurrentTimeRange,
  setLatestDate,
} from "./bigNumbersSlice";
import useFetchData from "../../hooks/useFetchData";
import { BigNumber } from "../../interfaces/BigNumber";
import { Category } from "../CategoriesMenu/categoriesSlice";
import { Card, Nav, Button } from "react-bootstrap";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { BigNumberButton } from "./BigNumberButton";
import useBigNumbers from "../../hooks/useBigNumbers";

export const LATEST_DATE_URL = "http://192.168.0.57:8000/last_day/";

const BigNumbers = (): JSX.Element => {
  const timeRanges: BigNumberTimeRange[] = ["сутки", "месяц", "год"];
  const activeCategory: Category = useSelector(
    (state: RootState) => state.categories
  );
  const currentTimeRange = useSelector(
    (state: RootState) => state.bigNumbers.currentTimeRange
  );
  const latestDate = useSelector(
    (state: RootState) => state.bigNumbers.latestDate
  );
  const currentCompanyId = useSelector(
    (state: RootState) => state.auth.currentCompanyId
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
    if (String(fetchedDate) != latestDate) {
      dispatch(setLatestDate(fetchedDate));
    }
  }, [dispatch, fetchedDate, latestDate]);

  const formattedDate = getFormattedDate(latestDate);

  const {
    oilPlan,
    oilFact,
    opec,
    gasPlan,
    gasFact,
    benzin,
    kerosin,
    dt,
    mt,
    xr,
    skv,
    poteri,
    avgOilPrice,
    avgOilPriceLocal,
    price92,
    price95,
    price98,
    dtl,
    dtz,
  } = useBigNumbers(currentTimeRangeInEnglish, currentCompanyIdStr);

  useEffect(() => {
    switch (Number(activeCategory)) {
      case 0:
        const manufacturing: BigNumber[] = [
          {
            title: "Добыча нефти (тонн)",
            id: "oil_yield",
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
            tableHeaders: ["Тип", "Тонн"],
          },

          {
            title: "Добыча газа (тыс. куб. м)",
            id: "gas_yield",
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

            tableHeaders: ["Тип", "Тыс. куб.м"],
          },
        ];
        if (currentCompanyId === 0) {
          setBigNumbers([
            ...manufacturing,

            {
              title: "Цена на нефть (тг / т)",
              id: "oil_prices",
              data: [
                {
                  label: "внешний",
                  value: avgOilPrice,
                },
                {
                  label: "внутренний",
                  value: avgOilPriceLocal,
                },
              ],
              tableHeaders: ["Рынок", "Тг / тонн"],
            },
            {
              title: "Производство нефтепродуктов",
              id: "oil_products_yield",
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
              tableHeaders: ["Тип", "Количество"],
            },
            {
              title: "Цены на нефтепродукты",
              id: "oil_products_prices",
              data: [
                {
                  label: "92",
                  value: price92,
                },
                {
                  label: "95",
                  value: price95,
                },
                {
                  label: "98",
                  value: price98,
                },
                {
                  label: "дтл",
                  value: dtl,
                },
                {
                  label: "дтз",
                  value: dtz,
                },
              ],
              tableHeaders: ["Тип", "Цена"],
            },
            {
              title: "Остаток НП (дни)",
              id: "leftover_oil_products",
              data: [
                {
                  label: "",
                  value: 3,
                },
              ],
              tableHeaders: [],
            },
            {
              title: "Экспорт",
              id: "export",
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
              tableHeaders: [],
            },
          ]);
        } else {
          setBigNumbers([
            ...manufacturing,
            {
              title: "Нефть на хранении",
              id: "oil_stored",
              data: [
                {
                  label: "факт",
                  value: xr,
                },
              ],
              tableHeaders: [],
            },
            {
              title: "Простой скважин",
              id: "well_downtime",
              data: [
                {
                  label: "факт",
                  value: skv,
                },
              ],
              tableHeaders: [],
            },
            {
              title: "Потери в тоннах",
              id: "losses",
              data: [
                {
                  label: "факт",
                  value: poteri,
                },
              ],
              tableHeaders: [],
            },
          ]);
        }

        break;
      case 1:
        setBigNumbers([
          {
            title: "Генерация (МВт)",
            id: "energy_generation",
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
            tableHeaders: [],
          },
          {
            title: "Выработка ВИЭ за 6 месяцев (млрд. кВт.ч)",
            id: "renewable_energy",
            data: [
              {
                label: "план",
                value: 2.297,
              },
              {
                label: "факт",
                value: 3.35,
              },
            ],
            tableHeaders: [],
          },
          {
            title: "Потребление (МВт)",
            id: "energy_consumption",
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
            tableHeaders: [],
          },
          {
            title: "Сальдо-переток (МВт)",
            id: "balance_flow",
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
            tableHeaders: [],
          },
          {
            title: "Потребление крупных предприятий Казахстана",
            id: "corporation_consumption",
            data: [],

            tableHeaders: [],
          },
          {
            title: "Нагрузка эл. станций национального значения",
            id: "station_load",
            data: [],
            tableHeaders: [],
          },
          {
            title: "Транзит ЭЭ (млн.кВтч)",
            id: "transit_ee",
            data: [
              {
                label: "Переток Сев. зоны РК-РФ план",
                value: 36.32,
              },
              {
                label: "факт",
                value: 39.8,
              },
              {
                label: " Переток Зап. зоны РК-РФ план",
                value: 0.57,
              },
              {
                label: "факт",
                value: 0.19,
              },
              {
                label: "Переток РК-ЦА план",
                value: 1.9,
              },
              {
                label: "факт",
                value: 1.21,
              },
            ],
            tableHeaders: [],
          },
          {
            title: "Перетоки энергосистем ЦА за 26 дней июля факт (млн.кВт.ч)",
            id: "flow_middle_asia_month",
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
            tableHeaders: [],
          },
        ]);

        break;
      case 2:
        setBigNumbers([
          /*лейблы для урановой промышленности*/
        ]);
        break;
      case 3:
        setBigNumbers([
          {
            title: "ОПЕК+",
            id: "opec",
            data: [
              {
                label: "показатель (тонны)",
                value: opec,
              },
            ],
            tableHeaders: [],
          },
        ]);
        break;
      default:
        setBigNumbers([]);
    }
  }, [
    activeCategory,
    avgOilPrice,
    avgOilPriceLocal,
    benzin,
    currentCompanyId,
    dt,
    dtl,
    dtz,
    gasFact,
    gasPlan,
    kerosin,
    mt,
    oilFact,
    oilPlan,
    opec,
    poteri,
    price92,
    price95,
    price98,
    skv,
    xr,
  ]);
  // useEffect(() => {
  //   console.log(bigNumbers);
  //   if (bigNumbers[0]) {
  //     dispatch(setBigNumberId(bigNumbers[0].id));
  //   }
  // }, [activeCategory, bigNumbers]);

  return (
    <Card className="big-numbers app-card">
      <h3 className="big-numbers__heading">Данные</h3>
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
                <BigNumberButton
                  bigNumber={bigNumber}
                  onClick={() => {
                    dispatch(setBigNumberValue(index));
                    dispatch(setBigNumberId(bigNumbers[index].id));
                  }}
                ></BigNumberButton>
              </li>
            )
          )}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default BigNumbers;
