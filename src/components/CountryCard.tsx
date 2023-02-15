import React from "react";
import { Card, Image, Text, createStyles, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    width: "100%",
    padding: "0px",
    maxWidth: "420px",
    height: "350px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },
  },
  image: {
    borderBottom: "1px solid",
    borderBlockColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[1],
  },
  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  textGroup: {
    gap: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  text: {
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.dark[7],
  },
}));

interface CardProps {
  image: string;
  title: string;
  population: number;
  capital: string[];
  region: string;
}

export default function CountryCard({
  image,
  title,
  population,
  capital,
  region,
}: CardProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof CardProps>) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.image}>
        <Image src={image} height={180} alt="flag" fit="fill" />
      </Card.Section>
      <Text className={classes.title} weight={500} fz="lg">
        {title}
      </Text>
      <Group className={classes.textGroup}>
        <Text size="sm" color="dimmed" lineClamp={4}>
          <Text span className={classes.text}>
            Population:
          </Text>{" "}
          {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <Text size="sm" color="dimmed" lineClamp={4}>
          <Text span className={classes.text}>
            Region:
          </Text>{" "}
          {region}
        </Text>
        <Text size="sm" color="dimmed" lineClamp={4}>
          <Text span className={classes.text}>
            Capital:
          </Text>{" "}
          {capital ? capital.join(", ") : '-'}
        </Text>
      </Group>
    </Card>
  );
}
