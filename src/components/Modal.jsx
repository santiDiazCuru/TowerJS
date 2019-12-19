import React from "react";

export default ({ message, score }) => {
  return (
    <div className="modal">
      <h1 className="title">TowerJS</h1>
      {message === "Press space to begin" ? null : (
        <h3 className="score">Score: {score}</h3>
      )}
      <img src="tower.png" width="150px" height="300px"></img>
      <h3 className="legend">{message}</h3>
      <br />
    </div>
  );
};
