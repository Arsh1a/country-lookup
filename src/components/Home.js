import React, { Component, Suspense } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Countries = React.lazy(() => import("./Countries"));

class Home extends Component {
  state = {
    countriesData: [],
    searchInput: "",
    regionInput: "All",
  };

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) =>
        res.data.map((country) => ({
          name: `${country.name}`,
          population: `${country.population}`,
          flag: `${country.flag}`,
          region: `${country.region}`,
          capital: `${country.capital}`,
          alpha3Code: `${country.alpha3Code}`,
        }))
      )
      .then((countriesData) => {
        this.setState({ countriesData });
      });
  }

  handleSearch = (e) => {
    this.setState({ searchInput: e.target.value });
    e.preventDefault();
  };

  handleRegion = (e) => {
    this.setState({ regionInput: e.target.value });
    e.preventDefault();
  };

  filterCountriesWithRegion = () => {
    const { regionInput, countriesData } = this.state;
    if (regionInput === "All") {
      return countriesData;
    } else {
      return countriesData.filter((country) => {
        return country.region === regionInput;
      });
    }
  };

  render() {
    const { countriesData, searchInput } = this.state;
    let countries = [];

    if (countriesData.length > 0) {
      countries = this.filterCountriesWithRegion();
      if (searchInput.length > 0) {
        countries = countries.filter((country) => {
          return country.name.toLowerCase().includes(searchInput.toLowerCase());
        });
      }
    } else {
      countries = countriesData;
    }
    return (
      <div
        className={
          document.getElementsByClassName("item-card").length <= 5
            ? "main-container"
            : "main-container"
        }
      >
        <div className="inputs-container">
          <input
            onChange={this.handleSearch}
            type="text"
            placeholder="Search country"
          />
          <select onChange={this.handleRegion}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="cards-container">
          {countries.length > 0 ? (
            countries.map((country) => {
              return (
                <div key={country.alpha3Code} className="item-card">
                  <Link to={"/country-lookup/" + country.alpha3Code}>
                    <Suspense fallback={<div></div>}>
                      <Countries
                        flag={country.flag}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                      />
                    </Suspense>
                  </Link>
                </div>
              );
            })
          ) : (
            <h3 className="not-found">Country not found</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
