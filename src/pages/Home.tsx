import React, { useState, FC, useEffect } from "react";
import { TextInput, Select, createStyles } from "@mantine/core";
import { Search } from "tabler-icons-react";
import CountryCard from "../components/CountryCard";
import { ICountry } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  search: {
    padding: "30px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: 300,
  },
  select: {
    width: 150,
  },
  countries: {
    minHeight: "77vh",
    marginBottom: "20px",
    display: "grid",
    gap: "3vw",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
}));

export const Home: FC<{
  data: ICountry[];
}> = ({ data }) => {
  const { classes } = useStyles();
  const [searchedCountry, setSearchedCountry] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const baseCount = 25;
  const [filteredData, setFilteredData] = useState<ICountry[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchedCountry(value);
  };

  function filterData(data: ICountry[], name: string, region: string | null) {
    const query = name.toLowerCase().trim();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    if (region) {
      return filtered.filter((item) => item.region.includes(region));
    }
    return filtered;
  }

  useEffect(() => {
    setFilteredData(filterData(data, searchedCountry, region));
  }, [region, searchedCountry, data]);

  useEffect(() => {
    setCountries(filteredData.slice(0, baseCount));
  }, [filteredData]);

  // infinite scroll simulation, no _limit in this API
  function fetchMoreData() {
    if (countries.length === filteredData.length) {
      setHasMore(false);
      return;
    }

    const maxVal =
      countries.length + baseCount < filteredData.length
        ? countries.length + baseCount
        : filteredData.length;

    const newData = filterData(
      filteredData.slice(countries.length, maxVal),
      searchedCountry,
      region
    );
    setCountries(countries.concat(newData));
  }

  return (
    <>
      <div className={classes.search}>
        <TextInput
          className={classes.input}
          placeholder="Search for a country..."
          icon={<Search size={14} />}
          value={searchedCountry}
          onChange={handleSearchChange}
        />
        <Select
          className={classes.select}
          width={"100px"}
          placeholder="Filter by region"
          data={["Africa", "America", "Asia", "Europe", "Oceania"]}
          clearable
          onChange={setRegion}
        />
      </div>
      <InfiniteScroll
        dataLength={countries.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={null}
      >
        <div className={classes.countries}>
          {countries.map((item: ICountry, index: number) => (
            <Link
              to={{ pathname: `/country/${item.cca3}` }}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <CountryCard
                image={item.flags}
                title={item.name}
                population={item.population}
                capital={item.capital}
                region={item.region}
              />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
