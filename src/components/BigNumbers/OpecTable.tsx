import React from "react";
import { CountryCurrentOpecData } from "../OpecGraph/opecSlice";
import { useSelector } from "react-redux";
import OpecSubtable from "./OpecSubTable";

const OpecTable = () => {
  const currentData: CountryCurrentOpecData[] = useSelector(
    (state) => state.opec.currentData
  );

  return (
    <div
      style={{
        color: "#fff",
      }}
    >
      <OpecSubtable name="ОПЕК" dataArr={currentData["countries_o"]} />
      <OpecSubtable name="ОПЕК+" dataArr={currentData["countries_o_plus"]} />
    </div>
  );
};

export default OpecTable;
