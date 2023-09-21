import { useEffect, useState } from "react";
import useFetchData from "./useFetchData";

function useGraphData(displayedYDataPoints) {
  const yieldUrls = ["oil", "gas", "opec"].map(
    (yieldType) =>
      `http://192.168.0.57:8000/calculate_last_x_months_${yieldType}_yield/${displayedYDataPoints}`
  );

  const oilData = useFetchData(yieldUrls[0], true);
  const gasData = useFetchData(yieldUrls[1], true);
  const opecData = useFetchData(yieldUrls[2], true);
  const eeData = useFetchData(
    `http://192.168.0.57:8000/calculate_electricity_last_x_elements/${displayedYDataPoints}/`,
    true
  );
  const oilPricesData = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_month_oil_avg_price_yield/${displayedYDataPoints}`,
    true
  );
  const oilPricesLocalData = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_month_oil_weight_yield${displayedYDataPoints}`,
    true
  );
  const prices92 = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_days_op_92/${displayedYDataPoints}/`,
    true
  );
  const prices95 = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_days_op_95/${displayedYDataPoints}/`, true
  );
  const prices98 = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_days_op_98/${displayedYDataPoints}/`, true
  );
  const pricesDtl = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_days_op_dtl/${displayedYDataPoints}/`, true
  );
  const pricesDtz = useFetchData(
    `http://192.168.0.57:8000/calculate_last_x_days_op_dtz/${displayedYDataPoints}/`, true
  );

  return {
    oilData,
    gasData,
    opecData,
    oilPricesData,
    oilPricesLocalData,
    prices92,
    prices95,
    prices98,
    pricesDtl,
    pricesDtz,
    eeData
  };
}

export default useGraphData;
