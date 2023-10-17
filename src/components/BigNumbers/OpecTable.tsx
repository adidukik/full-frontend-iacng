import React from "react";
import { useSelector } from "react-redux";
import { CountryCurrentOpecData } from "../OpecGraph/opecSlice";
import { Experimental_CssVarsProvider } from "@mui/material";

interface OpecSubtable {
  name: string;
  dataArr: CountryCurrentOpecData[];
}
const OpecSubtable = ({ name, dataArr }: OpecSubtable) => {
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {dataArr.map((el) => (
          <li>
            {el.country} - {el.quota_b}
          </li>
        ))}
      </ul>
    </div>
  );
};
const OpecTable = () => {
  const currentData: CountryCurrentOpecData[] = useSelector(
    (state) => state.opec.currentData
  );
  const opecArr = [], opecPlusArr = [];
  for (const cd of currentData) {
    if (cd.opek_type === "countries_o") {
      opecArr.push(cd);
    } else {
      opecPlusArr.push(cd);
    }
  }

  return (
    <div>
      <OpecSubtable name="ОПЕК" dataArr={opecArr} />
      <OpecSubtable name="ОПЕК+" dataArr={opecPlusArr} />
    </div>
  );
};

export default OpecTable;
