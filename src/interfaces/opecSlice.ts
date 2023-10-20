export type opecType = "countries_o_plus" | "countries_o";
export type OpecCountryName =
  | "Юж.Судан"
  | "Бруней"
  | "Бахрейн"
  | "Судан"
  | "Нигерия"
  | "Сауд.Аравия"
  | "Кувейт"
  | "Ливия"
  | "Азербайджан"
  | "Ирак"
  | "Казахстан"
  | "Экв.Гвин"
  | "Мексика"
  | "Конго"
  | "Габон"
  | "Ангола"
  | "Алжир"
  | "Россия"
  | "Оман"
  | "Венесуэла"
  | "Иран"
  | "ОАЭ"
  | "Малайзия";
export interface CountryCurrentOpecData {
  country: OpecCountryName;
  quota_t: number;
  quota_b: number;
  opek_type: opecType;
  isIncreased: boolean;
}
export interface CountryGraphDataPoint {
  opek_type: opecType;
  country: OpecCountryName;
  id: number;
  fact_b: number;
  quota_b: number;
  month: number;
  real_data: boolean;
  plan_t: number;
  plan_b: number;
  fact_t: number;
  quota_t: number;
  year: number;
  difference_b: number;
}
export interface currentDataInteface {
  countries_o: CountryCurrentOpecData[];
  countries_o_plus: CountryCurrentOpecData[];
}
export interface GraphDataByCountryName {
  [countryName: string]: CountryGraphDataPoint[];
}
export interface OpecState {
  chosenCountries: OpecCountryName[];
  currentCountry: OpecCountryName;
  currentData: currentDataInteface;
  graphDataByCountryName: GraphDataByCountryName;
  validCountries: OpecCountryName[];
}
