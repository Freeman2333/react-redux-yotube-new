import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Container from "./styles/Container";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Container>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Container>
      
    </Router>
  );
};

export default AppRouter;
