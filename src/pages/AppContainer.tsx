import { LoadingOverlay, createStyles } from "@mantine/core";
import { Error } from "./Error";
import { Route, Routes } from "react-router-dom";
import Country from "./Country";
import { Home } from "./Home";
import { useCountries } from "../API";

const useStyles = createStyles((theme) => ({
  app: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
  },
  container: {
    width: "92vw",
    margin: "0 auto",
  },
}));

export default function AppContainer() {
  const { classes } = useStyles();

  const { isLoading, isError, data: countries } = useCountries();

  if (isError) return <Error />;

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <Routes>
          <Route path="/country/:code" element={<Country />} />
          <Route
            path="/"
            element={
              isLoading ? (
                <LoadingOverlay
                  visible={true}
                  overlayBlur={2}
                  loaderProps={{ variant: "bars" }}
                />
              ) : (
                countries && <Home data={countries} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}
