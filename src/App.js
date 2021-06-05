import React from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import Auth from "./components/Auth";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Router from "./Router";

function App() {
  const { token } = useSelector((state) => state.user.data);
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {token ? <Router /> : <Auth />}
    </ThemeProvider>
  );
}

export default App;

const darkTheme = {
  bg: "#181818",
  primaryColor: "#FFF",
  secondaryColor: "#AAAAAA",
  grey: "#202020",
  darkGrey: "#383838",
  black: "#121212",
  red: "#CC0000",
  blue: "#3EA6FF",
  white: "#FFF",
  pink: "#F86782",
  purple: "#282A36",
  font: "Fira Sans",
};
