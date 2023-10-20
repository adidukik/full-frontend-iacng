import Button from "@mui/material/Button";
import { CountryCurrentOpecData, OpecCountryName, setCurrentCountry } from "../OpecGraph/opecSlice";
import { useDispatch, useSelector } from "react-redux";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

interface OpecSubTable {
  name: string;
  dataArr: CountryCurrentOpecData[];
}
const OpecSubTable = ({ name, dataArr }: OpecSubTable) => {
  const dispatch = useDispatch();
  const currentUnits = useSelector(
    (state) => state.bigNumbers.currentBigNumberTab
  );
  const currentCountry = useSelector((state) => state.opec.currentCountry);
  const isTonnes = currentUnits === "тонны";
  const handleItemClick = (countryName: OpecCountryName) => {
    dispatch(setCurrentCountry(countryName));
  };
  return (
    <div>
      <h3>{name}</h3>
      <ul>
        {dataArr?.map((el) => (
          <li
            className={`w-full ${
              currentCountry === el.country ? "bg-light" : ""
            } `}
          >
            <Button
              onClick={() => handleItemClick(el.country)}
              className="w-100"
            >
              <div className="w-100 d-flex justify-content-between">
                <div className="text-slate-50">{el.country}</div>
                <div
                  className={el.isIncreased ? "text-success" : "text-danger"}
                >
                  {isTonnes ? Math.round(el.quota_t) : el.quota_b}
                  {el.isIncreased ? <NorthIcon /> : <SouthIcon />}
                </div>
              </div>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpecSubTable;
