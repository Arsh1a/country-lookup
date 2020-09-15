import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CountryPage from "./components/CountryPage";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(getInitialMode());

  React.useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false;
  }

  if (darkMode) {
    document.body.style.backgroundColor = "#212E37";
  } else {
    document.body.style.backgroundColor = "#FAFAFA";
  }

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Navbar toggle={setDarkMode} darkMode={darkMode} />
        <Switch>
          <Route exact path="/country-lookup" component={Home} />
          <Route path="/country-lookup/:country_id" component={CountryPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
