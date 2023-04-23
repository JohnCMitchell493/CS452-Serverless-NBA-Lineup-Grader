import React from "react";

const Table = ({
  avgPPG,
  avgRPG,
  avgAPG,
  avgTO,
  totPPG,
  totRPG,
  totAPG,
  totTO,
  avgFG,
  avgThree,
  avgFree,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Average</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PPG</td>
          <td>{avgPPG}</td>
          <td>{totPPG}</td>
        </tr>
        <tr>
          <td>RPG</td>
          <td>{avgRPG}</td>
          <td>{totRPG}</td>
        </tr>
        <tr>
          <td>APG</td>
          <td>{avgAPG}</td>
          <td>{totAPG}</td>
        </tr>
        <tr>
          <td>TO</td>
          <td>{avgTO}</td>
          <td>{totTO}</td>
        </tr>
        <tr>
          <td>FG%</td>
          <td>{avgFG}</td>
          <td></td>
        </tr>
        <tr>
          <td>3PT%</td>
          <td>{avgThree}</td>
          <td></td>
        </tr>
        <tr>
          <td>FT%</td>
          <td>{avgFree}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
