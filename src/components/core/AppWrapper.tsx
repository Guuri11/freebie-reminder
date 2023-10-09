import React from "react";

import { AppProvider } from "../../context";
import AppStore from "../../stores/app";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { MODE } from "../../constants";

export type AppProps = {};

type Props = React.PropsWithChildren<AppProps>;

const theme = createTheme({
  mode: MODE,
});

const AppWrapper: React.FunctionComponent<Props> = ({ children }: Props) => {
  const defaultStore = React.useRef(new AppStore());


  return (
    <ThemeProvider theme={theme}>
      <AppProvider store={defaultStore.current}>{children}</AppProvider>
    </ThemeProvider>
  );
};

export default AppWrapper;
