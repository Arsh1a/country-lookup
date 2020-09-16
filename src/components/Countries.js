import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Countries = (props) => {
  const formatNumbers = (n) => {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const checkIfExist = (a) => {
    if (a.length > 0) {
      return a;
    } else {
      return <>N/A</>;
    }
  };

  return (
    <React.Fragment>
      <div className="country-image">
        <LazyLoadImage alt={props.name + " flag"} src={props.flag} />
      </div>
      <div className="country-info">
        <p className="country-name">{props.name}</p>
        <p className="country-population">
          <span>Population:</span>{" "}
          {checkIfExist(formatNumbers(props.population))}
        </p>
        <p className="country-region">
          <span>Region:</span> {checkIfExist(props.region)}
        </p>
        <p className="country-region">
          <span>Capital:</span> {checkIfExist(props.capital)}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Countries;
