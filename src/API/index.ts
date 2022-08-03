import axios from "axios";

export async function getCountries() {
  try {
    const { data } = await axios.get<any>("https://restcountries.com/v3.1/all");

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export async function getCountriesByRegion(region: string) {
   try {
     const { data } = await axios.get<any>(`https://restcountries.com/v3.1/region/${region}`);
 
     return data;
   } catch (error) {
     if (axios.isAxiosError(error)) {
       console.log("error message: ", error.message);
       return error.message;
     } else {
       console.log("unexpected error: ", error);
       return "An unexpected error occurred";
     }
   }
}

export async function getCountriesByName(name: string) {
   try {
     const { data } = await axios.get<any>(`https://restcountries.com/v3.1/name/${name}`);
 
     return data;
   } catch (error) {
     if (axios.isAxiosError(error)) {
       console.log("error message: ", error.message);
       return error.message;
     } else {
       console.log("unexpected error: ", error);
       return "An unexpected error occurred";
     }
   }
 }
