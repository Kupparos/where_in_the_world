import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Center,
  Avatar,
  createStyles,
} from "@mantine/core";
import { useCountries } from "../hooks/useCountries";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    width: 300,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },
}));

interface CardProps {
  image: string;
  link: string;
  title: string;
  description: string;
}

export default function CountryCard({
  className,
  image,
  link,
  title,
  description,
}: CardProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof CardProps>) {
  const { classes, cx, theme } = useStyles();
  const country = useCountries();

  const linkProps = {
    href: link,
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <Card withBorder radius="md" className={cx(classes.card, className)}>
      <a {...linkProps}>
        <Image src={image} height={180} />
        
        <Text className={classes.title} weight={500}>
          {title}
        </Text>

        <Text size="sm" color="dimmed" lineClamp={4}>
          {description}
        </Text>
      </a>
    </Card>
  );
}
