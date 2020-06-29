import React from "react";

const Countries = (props) => {
  const formatNumbers = (n) => {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <React.Fragment>
      <div className="country-image">
        <img src={props.flag} alt={props.name + " flag"} />
      </div>
      <div className="country-info">
        <p className="country-name">{props.name}</p>
        <p className="country-population">
          <span>Population:</span> {formatNumbers(props.population)}
        </p>
        <p className="country-region">
          <span>Region:</span> {props.region}
        </p>
        <p className="country-region">
          <span>Capital:</span> {props.capital}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Countries;
