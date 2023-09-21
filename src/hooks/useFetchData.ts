import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function useFetchData<T>(url: string, isArray: boolean = false, isPrimitive = false): T | null {
  const [data, setData] = useState<T | null>(null);
  const [cachedData, setCachedData] = useState({});

  const latestDate: Date = useSelector(
    (state: RootState) => state.bigNumbers.latestDate,
  );
  useEffect(() => {
    const fetchData = async () => {
      if (cachedData[url] === undefined) {
        fetch(url)
          .then((response) => response.json())
          .then((fetchedData) => {
            let value;
            if(isPrimitive){
              value = fetchedData;
            }else{
              value = isArray ? fetchedData : Object.values(fetchedData)[0];
            }
            setCachedData((prevCachedData) => ({
              ...prevCachedData,
              [url]: value,
            }));
          });
      }
    };
    fetchData();
  }, [isArray, url]);

  useEffect(() => {
    setData(cachedData[url]);
  }, [cachedData, url]);

  return data;
}

export default useFetchData;
