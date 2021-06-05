import React from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import Auth from "./components/Auth";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  console.log(process.env.REACT_APP_BE);
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <ToastContainer
          autoClose={2500}
          position="top-right"
          closeButton={false}
        />
        <Auth />
      </ThemeProvider>
    </Provider>
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
