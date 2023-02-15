import {
  createStyles,
  Group,
  LoadingOverlay,
  Button,
  Text,
  SimpleGrid,
} from "@mantine/core";
import { ArrowLeft } from "tabler-icons-react";
import { useCountry } from "../API";
import { Link, useParams } from "react-router-dom";
import { Error } from "./Error";
import { currenciesMapper, nativeNameMapper } from "../utils";

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "91vh",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "30px 0 50px",
  },
  info: {
    justifyContent: "space-between",
  },
  group: {
    width: "42vw",
    minWidth: "290px",
    display: "grid",
    gap: "20px",
    gridAutoColumns: "auto auto",
  },
}));

export default function Country() {
  const { classes } = useStyles();
  let codeName = useParams<string>().code;

  const {
    isLoading,
    isError,
    data: currentCountry,
  } = useCountry(`alpha/${codeName}`);

  if (isError) return <Error />;
  if (isLoading)
    return (
      <LoadingOverlay
        visible={true}
        overlayBlur={2}
        loaderProps={{ variant: "bars" }}
      />
    );

  return (
    <div className={classes.page}>
      {currentCountry && (
        <>
          <Group className={classes.head}>
            <Link to="/">
              <Button
                leftIcon={<ArrowLeft />}
                variant="default"
                color="dark"
                size="lg"
              >
                Back
              </Button>
            </Link>
          </Group>
          <Group className={classes.info}>
            <img
              src={currentCountry[0].flags}
              alt="flag"
              style={{ width: "42vw", minWidth: "290px" }}
            ></img>
            <Group className={classes.group}>
              <Text fw={600} fz="2em">
                {currentCountry[0].name}
              </Text>
              <SimpleGrid cols={2}>
                <Text>
                  <Text span fw={500}>
                    Native name:
                  </Text>{" "}
                  {nativeNameMapper(currentCountry[0].nativeName)}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Population:
                  </Text>{" "}
                  {currentCountry[0].population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Region:
                  </Text>{" "}
                  {currentCountry[0].region}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Subregion:
                  </Text>{" "}
                  {currentCountry[0].subregion}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Capital:
                  </Text>{" "}
                  {currentCountry[0].capital}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Top Level Domain:
                  </Text>{" "}
                  {currentCountry[0].topLevelDomain.join(", ")}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Currencies:
                  </Text>{" "}
                  {currenciesMapper(currentCountry[0].currencies)}
                </Text>
                <Text>
                  <Text span fw={500}>
                    Languages:
                  </Text>{" "}
                  {Object.values(currentCountry[0].languages).join(", ")}
                </Text>
              </SimpleGrid>
              <Text fw={500}>Border countries: </Text>
              <div>
                {currentCountry[0].borders?.map((e, index) => (
                  <Link
                    to={`/${e}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="default"
                      color="dark"
                      w={"100px"}
                      m={"10px"}
                    >
                      {e}
                    </Button>
                  </Link>
                ))}
              </div>
            </Group>
          </Group>
        </>
      )}
    </div>
  );
}
