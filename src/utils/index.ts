import { Currencies, Natives } from "../types";

export function nativeNameMapper (obj: Natives) {
 return Object.values(obj).map((e) => e.official).join(', ')
}

export function currenciesMapper (obj: Currencies) {
   return Object.values(obj).map((e) => e.name).join(', ')
  }