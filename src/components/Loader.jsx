import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="spinner-overlay">
    <div className="spinner">
      <div className="orbit"></div>
      <div className="center-dot"></div>
    </div>
  </div>
  );
};

export default Loader;
