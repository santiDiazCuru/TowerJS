import React from "react";

export default ({ tower, score }) => {
  return (
    <div className="game">
      <table id="board">
        {tower.map((cells, i) => {
          return (
            <tr className="row" key={i}>
              {cells.map((alive, i) => {
                if (alive) {
                  return <td className="cell alive" key={i}></td>;
                }
                return <td className="cell" key={i}></td>;
              })}
            </tr>
          );
        })}
      </table>
      <h3>Score: {score}</h3>
    </div>
  );
};
