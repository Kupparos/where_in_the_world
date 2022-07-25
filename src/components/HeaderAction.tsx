import React from "react";
import {
  createStyles,
  Center,
  UnstyledButton,
  Text,
  Header,
  Container,
  useMantineColorScheme,
  Group,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Moon, Sun } from "tabler-icons-react";

const HEADER_HEIGHT = 75;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 4vw",
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    width: 136,
    height: 36,
  },

  iconWrapper: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
    color: theme.colorScheme === "dark" ? theme.black : theme.colors.blue[2],
  },
}));

export function HeaderAction() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === "dark" ? Sun : Moon;

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.inner} fluid>
        <Group className={classes.title}>Where in the world?</Group>
        <UnstyledButton
          aria-label="Toggle theme"
          className={classes.control}
          onClick={() => toggleColorScheme()}
        >
          <Center className={classes.iconWrapper}>
            <Icon size={18} />
          </Center>
          <Text size="sm">
            {upperFirst(colorScheme === "light" ? "dark" : "light")} mode
          </Text>
        </UnstyledButton>
      </Container>
    </Header>
  );
}