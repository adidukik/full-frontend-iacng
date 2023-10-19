const cachedData: { [url: string]: any } = {};

export const fetchCachedData = async <T>(url: string): Promise<T> => {
  console.log(url);
  if (cachedData[url]) {
    return cachedData[url];
  } else {
    const response = await fetch(url);
    const data: T = await response.json();
    cachedData[url] = data;
    return data;
  }
};
