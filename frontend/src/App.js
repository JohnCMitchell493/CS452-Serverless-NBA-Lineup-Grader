import axios from "axios";
import Card from "./Card";
import Info from "./Info";
import NameForm from "./NameInput";
import ReloadButton from "./ReloadButton";
import React, { useState } from "react";
import "./index.css";

function App() {
  const [responseData, setResponseData] = useState(null);
  const [averages, setAverages] = useState(null);
  const [totals, setTotals] = useState(null);
  const [grade, setGrade] = useState(null);

  const handleSubmit = async (inputValue) => {
    try {
      console.log(inputValue);

      let player1 = inputValue[0].replace(/\s+/g, "-");
      let player2 = inputValue[1].replace(/\s+/g, "-");
      let player3 = inputValue[2].replace(/\s+/g, "-");
      let player4 = inputValue[3].replace(/\s+/g, "-");
      let player5 = inputValue[4].replace(/\s+/g, "-");

      const response = await axios.get(
        `https://1h9sybsqz8.execute-api.us-east-2.amazonaws.com/dev/player-stats?pg=${player1}&sg=${player2}&sf=${player3}&pf=${player4}&c=${player5}`
      );

      for (let i = 0; i < 5; i++) {
        const name = response.data[i]["full_name"]["S"].replace(/-/g, " ");
        if (name === inputValue[0]) {
          player1 = response.data[i];
        } else if (name === inputValue[1]) {
          player2 = response.data[i];
        } else if (name === inputValue[2]) {
          player3 = response.data[i];
        } else if (name === inputValue[3]) {
          player4 = response.data[i];
        } else if (name === inputValue[4]) {
          player5 = response.data[i];
        }
      }

      const result = [player1, player2, player3, player4, player5];

      let avgFg = 0;
      let avgThree = 0;
      let avgFree = 0;
      let valid = 0;

      let totalPoints = 0;
      let totalRebounds = 0;
      let totalAssists = 0;
      let totalTurnovers = 0;

      for (let i = 0; i < 5; i++) {
        avgFg += parseFloat(response.data[i]["percentageFieldGoal"]["N"]);
        if (parseFloat(response.data[i]["percentageThree"]["N"])) {
          valid++;
          avgThree += parseFloat(response.data[i]["percentageThree"]["N"]);
        }
        avgFree += parseFloat(response.data[i]["percentageFreethrow"]["N"]);
        totalPoints += parseFloat(response.data[i]["points"]["N"]);
        totalRebounds += parseFloat(response.data[i]["rebounds"]["N"]);
        totalAssists += parseFloat(response.data[i]["assists"]["N"]);
        totalTurnovers += parseFloat(response.data[i]["turnovers"]["N"]);
      }

      avgFg = avgFg / 5;
      avgThree = avgThree / valid;
      avgFree = avgFree / 5;

      avgFg = Math.round(avgFg * 100) / 100;
      avgThree = Math.round(avgThree * 100) / 100;
      avgFree = Math.round(avgFree * 100) / 100;

      let avgPoints = Math.round((totalPoints / 5) * 100) / 100;
      let avgRebounds = Math.round((totalRebounds / 5) * 100) / 100;
      let avgAssists = Math.round((totalAssists / 5) * 100) / 100;
      let avgTurnovers = Math.round((totalTurnovers / 5) * 100) / 100;

      totalPoints = Math.round(totalPoints * 100) / 100;
      totalRebounds = Math.round(totalRebounds * 100) / 100;
      totalAssists = Math.round(totalAssists * 100) / 100;
      totalTurnovers = Math.round(totalTurnovers * 100) / 100;

      const avgs = [
        avgPoints,
        avgRebounds,
        avgAssists,
        avgTurnovers,
        avgFg,
        avgThree,
        avgFree,
      ];

      const totals = [totalPoints, totalRebounds, totalAssists, totalTurnovers];

      setAverages(avgs);

      setTotals(totals);

      setResponseData(result);

      // grading

      // A+ A A- B+ B B- C+ C C- D+ D D- F

      let score =
        totalPoints + totalAssists * 1.5 + totalRebounds * 1.2 - totalTurnovers;

      let grade = "";

      if (score > 160) {
        grade = "A+";
      } else if (160 >= score && score > 150) {
        grade = "A";
      } else if (150 >= score && score > 140) {
        grade = "A-";
      } else if (140 >= score && score > 130) {
        grade = "B+";
      } else if (130 >= score && score > 120) {
        grade = "B";
      } else if (120 >= score && score > 110) {
        grade = "B-";
      } else if (110 >= score && score > 100) {
        grade = "C+";
      } else if (100 >= score && score > 90) {
        grade = "C";
      } else if (90 >= score && score > 80) {
        grade = "C-";
      } else if (80 >= score && score > 70) {
        grade = "D+";
      } else if (70 >= score && score > 60) {
        grade = "D";
      } else if (60 >= score && score > 50) {
        grade = "D-";
      } else if (50 >= score) {
        grade = "F";
      }

      setGrade(grade);
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="main">
      {responseData ? (
        <div>
          <div className="card-container">
            <Card
              imageUrl={responseData[0]["headShotUrl"]["S"]}
              title={responseData[0]["full_name"]["S"].replace(/-/g, " ")}
              height={responseData[0]["height"]["S"]}
              points={responseData[0]["points"]["N"]}
              rebounds={responseData[0]["rebounds"]["N"]}
              assists={responseData[0]["assists"]["N"]}
            />
            <Card
              imageUrl={responseData[1]["headShotUrl"]["S"]}
              title={responseData[1]["full_name"]["S"].replace(/-/g, " ")}
              height={responseData[1]["height"]["S"]}
              points={responseData[1]["points"]["N"]}
              rebounds={responseData[1]["rebounds"]["N"]}
              assists={responseData[1]["assists"]["N"]}
            />
            <Card
              imageUrl={responseData[2]["headShotUrl"]["S"]}
              title={responseData[2]["full_name"]["S"].replace(/-/g, " ")}
              height={responseData[2]["height"]["S"]}
              points={responseData[2]["points"]["N"]}
              rebounds={responseData[2]["rebounds"]["N"]}
              assists={responseData[2]["assists"]["N"]}
            />
            <Card
              imageUrl={responseData[3]["headShotUrl"]["S"]}
              title={responseData[3]["full_name"]["S"].replace(/-/g, " ")}
              height={responseData[3]["height"]["S"]}
              points={responseData[3]["points"]["N"]}
              rebounds={responseData[3]["rebounds"]["N"]}
              assists={responseData[3]["assists"]["N"]}
            />
            <Card
              imageUrl={responseData[4]["headShotUrl"]["S"]}
              title={responseData[4]["full_name"]["S"].replace(/-/g, " ")}
              height={responseData[4]["height"]["S"]}
              points={responseData[4]["points"]["N"]}
              rebounds={responseData[4]["rebounds"]["N"]}
              assists={responseData[4]["assists"]["N"]}
            />
          </div>
          <Info
            avgPPG={averages[0]}
            avgRPG={averages[1]}
            avgAPG={averages[2]}
            avgTO={averages[3]}
            totPPG={totals[0]}
            totRPG={totals[1]}
            totAPG={totals[2]}
            totTO={totals[3]}
            avgFG={averages[4]}
            avgThree={averages[5]}
            avgFree={averages[6]}
            grade={grade}
          />
          <ReloadButton />
        </div>
      ) : (
        <div className="instructions">
          <h1>NBA Lineup Grader</h1>
          <h2>Enter a starting five:</h2>
          <NameForm onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}

export default App;
