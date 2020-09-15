import React from "react";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <h1>Where in the world?</h1>
      <div
        className="toggle"
        onClick={() => props.toggle((prevMode) => !prevMode)}
      >
        {props.darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
      </div>
    </div>
  );
};

export default Navbar;
