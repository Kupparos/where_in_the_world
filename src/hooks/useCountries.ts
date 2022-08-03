import { getCountries } from "../API";

interface Languages {
  [key: string]: string;
}

interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  languages: Languages;
  flag: string;
  currencies: string;
  borders: string[];
  topLevelDomain: string;
};

export function useCountries() {
   const data = getCountries()
   
}
