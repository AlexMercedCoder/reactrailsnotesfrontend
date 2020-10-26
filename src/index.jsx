import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
import { App } from "./components/App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppState } from "./AppState.jsx";

ReactDom.render(
  <AppState>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </AppState>,
  document.querySelector("#root")
);
