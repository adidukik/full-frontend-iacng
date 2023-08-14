import useFetchData from "./useFetchData";

function useWeather<T>(): T | null {
  const key = "1760b23c8428cb47fd2c3cb07818b825";
  const lat = 51.1655;
  const lon = 71.4272;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  const weatherData = useFetchData(url);
  return weatherData;
}

export default useWeather;
