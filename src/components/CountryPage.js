import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class CountryPage extends Component {
  state = {
    country: null,
  };
  componentDidMount() {
    let id = this.props.match.params.country_id;
    axios.get(`https://restcountries.eu/rest/v2/alpha/` + id).then((res) => {
      this.setState({ country: res.data });
      console.log(res);
    });
  }

  reduceObjects = (objects) => {
    return objects.reduce((a, o, i) => {
      if (i === 0) {
        return o.name;
      } else {
        return a + ", " + o.name;
      }
    }, "");
  };

  formatNumbers = (n) => {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  renderCountry = () => {
    const { country } = this.state;
    if (country === null) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="info-container">
          <div>
            <img alt={country.name + ` flag`} src={country.flag} />
          </div>
          <div className="country-info">
            <h1>{country.name}</h1>
            <div className="country-sub-info">
              <div className="country-sub-info-col-1">
                <p>
                  <span>Region:</span> {country.region}
                </p>
                <p>
                  <span>Subregion:</span> {country.subregion}
                </p>
                <p>
                  <span>Native name:</span> {country.nativeName}
                </p>
                <p>
                  <span>Capital:</span> {country.capital}
                </p>
              </div>
              <div className="country-sub-info-col-2">
                <p>
                  <span>Population:</span>{" "}
                  {this.formatNumbers(country.population)}
                </p>
                <p>
                  <span>Language:</span> {this.reduceObjects(country.languages)}
                </p>
                <p>
                  <span>Currency:</span>{" "}
                  {this.reduceObjects(country.currencies)}
                </p>
                <p>
                  <span>Top level domain:</span> {country.topLevelDomain}
                </p>
              </div>
            </div>
            <p>
              <a href={`https://en.wikipedia.org/wiki/` + country.name}>
                Wikipedia page
              </a>
            </p>
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="main-container">
        <div className="inputs-container">
          <button onClick={this.props.history.goBack}>Back</button>
        </div>
        {this.renderCountry()}
      </div>
    );
  }
}

export default withRouter(CountryPage);
