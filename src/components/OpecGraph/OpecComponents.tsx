import React, { useEffect } from "react";
import OpecGraphCountry from "./OpecGraphCountry";
import OpecGraphAll from "./OpecGraphAll";
import { useDispatch } from "react-redux";
import { fetchCurrentData } from "./opecSlice";

const OpecComponents = () => {
  // Inside your component
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentData());
  }, [dispatch]);
  return (
    <>
      <div className="OpecGraphCountry">
        <OpecGraphCountry />
      </div>
      <div className="OpecGraphAll">
        <OpecGraphAll />
      </div>
    </>
  );
};

export default OpecComponents;