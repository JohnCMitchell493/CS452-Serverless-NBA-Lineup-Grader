import React from "react";
import Table from "./Table";

const Info = ({
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
  grade,
}) => {
  let className = ""; // Define an empty string for the h1 className

  // Use a switch statement to set the className based on the grade value
  switch (grade) {
    case "A+":
      className = "grade-a";
      break;
    case "A":
      className = "grade-a";
      break;
    case "A-":
      className = "grade-a";
      break;
    case "B+":
      className = "grade-b";
      break;
    case "B":
      className = "grade-b";
      break;
    case "B-":
      className = "grade-b";
      break;
    case "C+":
      className = "grade-c";
      break;
    case "C":
      className = "grade-c";
      break;
    case "C-":
      className = "grade-c";
      break;
    case "D+":
      className = "grade-d";
      break;
    case "D":
      className = "grade-d";
      break;
    case "D-":
      className = "grade-d";
      break;
    case "F":
      className = "grade-f";
      break;
    default:
      className = "grade-default";
  }
  return (
    <div className="info">
      <div className="left">
        <Table
          avgPPG={avgPPG}
          avgRPG={avgRPG}
          avgAPG={avgAPG}
          avgTO={avgTO}
          totPPG={totPPG}
          totRPG={totRPG}
          totAPG={totAPG}
          totTO={totTO}
          avgFG={avgFG}
          avgThree={avgThree}
          avgFree={avgFree}
        />
      </div>
      <div className={className}>
        <h1>{grade}</h1>
      </div>
    </div>
  );
};

export default Info;
