import React from "react";

export default ({ message }) => {
  return (
    <div className="modal">
      <h1 className="title">TowerJS</h1>
      <img src="tower.png" width="150px" height="300px"></img>
      <h3 className="legend">{message}</h3>
      <br />
    </div>
  );
};
