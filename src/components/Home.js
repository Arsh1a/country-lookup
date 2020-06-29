import React, { Component } from "react";
import axios from "axios";
import Countries from "./Countries";
import { Link } from "react-router-dom";

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
      <div className="main-container">
        <div className="inputs-container">
          <input
            onChange={this.handleSearch}
            type="text"
            placeholder="Search country"
          />
          <select onChange={this.handleRegion}>
            <option value="All">Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="cards-container">
          {countries.length > 0
            ? countries.map((country) => {
                return (
                  <div className="item-card" key={country.alpha3Code}>
                    <Link to={"/countries/" + country.alpha3Code}>
                      <Countries
                        flag={country.flag}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                      />
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Home;
