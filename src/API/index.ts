import axios from "axios";
import { useQuery } from "react-query";
import { ICountry } from "../types";

const mappedResponse = (res: any): Array<ICountry> => {
  return Array.isArray(res?.data)
    ? res.data.map((e: any) => {
        return {
          name: e.name.official,
          nativeName: e.name.nativeName,
          population: e.population,
          region: e.region,
          subregion: e.subregion,
          capital: e.capital,
          languages: e.languages,
          flags: e.flags.svg,
          currencies: e.currencies,
          borders: e.borders,
          topLevelDomain: e.tld,
          cca3: e.cca3,
        };
      })
    : [];
};

const CountriesClient = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
});

export const useCountries = () => {
  return useQuery("countries", () =>
     CountriesClient.get<ICountry[]>("all").then((result) => mappedResponse(result))
  );
};

export const useCountry = (path: string) => {
  return useQuery({
    queryKey: ["country", path],
    queryFn: () =>
      CountriesClient.get<ICountry>(path).then((result) =>
        mappedResponse(result)
      ),
  });
};
