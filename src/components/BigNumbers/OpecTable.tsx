import React from "react";
import { useSelector } from "react-redux";
import OpecSubtable from "./OpecSubTable";
import { CountryCurrentOpecData } from "../../interfaces/opecSlice";
import { RootState } from "../../../store";

const OpecTable = () => {
  const currentData: CountryCurrentOpecData[] = useSelector(
    (state: RootState) => state.opec.currentData,
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
