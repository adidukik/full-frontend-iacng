import { useEffect, useState } from "react";
import useFetchData from "./useFetchData";

function useBigNumbers(currentTimeRangeInEnglish, currentCompanyIdStr) {
  const oilPlan = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_plan/${currentCompanyIdStr}`
    )
  );
  const oilFact = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield/${currentCompanyIdStr}`
    )
  );
  const opec = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_opec_yield/${currentCompanyIdStr}`
    )
  );
  const gasPlan = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield_plan/${currentCompanyIdStr}`
    )
  );
  const gasFact = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_gas_yield/${currentCompanyIdStr}`
    )
  );
  const benzin = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_benzin_last_${currentTimeRangeInEnglish}`
    )
  );
  const kerosin = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_kerosin_last_${currentTimeRangeInEnglish}`
    )
  );
  const dt = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_dt_last_${currentTimeRangeInEnglish}`
    )
  );
  const mt = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_mt_last_${currentTimeRangeInEnglish}`
    )
  );
  const xr = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_xr/${currentCompanyIdStr}`
    )
  );
  const skv = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_skv/${currentCompanyIdStr}`
    )
  );
  const poteri = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_${currentTimeRangeInEnglish}_oil_yield_poteri/${currentCompanyIdStr}`
    )
  );
  const avgOilPrice = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_x_month_oil_avg_price_yield/1`
    )
  );
  const avgOilPriceLocal = Math.floor(
    useFetchData(
      `http://192.168.0.57:8000/calculate_last_x_month_oil_weight_yield1`
    )
  );

  const price92_fetched = useFetchData(
    `http://192.168.0.57:8000/calculate_last_day_op_avg_price_92/`,
    true
  );
  const [price92, setPrice92] = useState(0);
  useEffect(() => {
    setPrice92(price92_fetched?.average?.toFixed(2));
  }, [price92_fetched]);

  const price95_fetched = useFetchData(
    `http://192.168.0.57:8000/calculate_last_day_op_avg_price_95/`,
    true
  );
  const [price95, setPrice95] = useState(0);
  useEffect(() => {
    setPrice95(price95_fetched?.average?.toFixed(2));
  }, [price95_fetched]);

  const price98_fetched = useFetchData(
    `http://192.168.0.57:8000/calculate_last_day_op_avg_price_98/`,
    true
  );
  const [price98, setPrice98] = useState(0);
  useEffect(() => {
    setPrice98(price98_fetched?.average?.toFixed(2));
  }, [price98_fetched]);

  const dtl_fetched = useFetchData(
    `http://192.168.0.57:8000/calculate_last_day_op_avg_price_dtl/`,
    true
  );
  const [dtl, setDtl] = useState(0);
  useEffect(() => {
    setDtl(dtl_fetched?.average?.toFixed(2));
  }, [dtl_fetched]);

  const dtz_fetched = useFetchData(
    `http://192.168.0.57:8000/calculate_last_day_op_avg_price_dtz/`,
    true
  );
  const [dtz, setDtz] = useState(0);
  useEffect(() => {
    setDtz(dtz_fetched?.average?.toFixed(2));
  }, [dtz_fetched]);

  return {
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
  };
}

export default useBigNumbers;
