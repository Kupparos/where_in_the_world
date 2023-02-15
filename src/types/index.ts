type Languages = {
  [key: string]: string;
};

export type Natives = {
  [key: string]: Native;
};

export type Currencies = {
  [key: string]: Currency;
};

type Native = {
  official: string;
  common: string;
};

type Currency = {
  name: string;
  symbol: string;
};

export interface ICountry {
  name: string;
  nativeName: Natives;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  languages: Languages;
  flags: string;
  currencies: Currencies;
  borders?: string[];
  topLevelDomain: string[];
  cca3: string;
}
