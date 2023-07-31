import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function useFetchData<T>(url: string, isArray: boolean = false): T | null {
  const [data, setData] = useState<T | null>(null);
  const [cachedData, setCachedData] = useState({});

  const latestDate: Date = useSelector(
    (state: RootState) => state.bigNumbers.latestDate,
  );
  useEffect(() => {
    // setCachedData({});
  }, [latestDate]);
  useEffect(() => {
    const fetchData = async () => {
      if (cachedData[url] === undefined) {
        // console.log(url + "\n");
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (isArray) {
            setCachedData((prevCachedData) => ({
              ...prevCachedData,
              [url]: data,
            }));
          } else {
            setCachedData((prevCachedData) => ({
              ...prevCachedData,
              [url]: Object.values(data)[0],
            }));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    setData(cachedData[url]);
  }, [cachedData, url]);

  return data;
}

export default useFetchData;
