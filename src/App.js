import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CountryPage from "./components/CountryPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/country-lookup" component={Home} />
          <Route path="/country-lookup/:country_id" component={CountryPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
