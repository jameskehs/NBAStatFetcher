const express = require("express");
const app = express();
port = process.env.PORT || 5000;
const axios = require("axios").default;

app.get("/", (req, res, next) => {
  try {
    res.json({ msg: "Hi" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/lastGameJSON", async (req, res, next) => {
  try {
    const URL =
      "https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=1&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=";
    const config = {
      headers: { "Content-Type": "application/json", Referer: "https://www.nba.com/", "Cache-Control": "no-cache", Host: "stats.nba.com" },
    };
    const {
      data: { resultSets },
    } = await axios.get(URL, config);
    let statArray = [];
    for (i = 0; i < resultSets[0].rowSet.length; i++) {
      let player = new Object();
      for (j = 0; j < resultSets[0].rowSet[i].length; j++) {
        let key = resultSets[0].headers[j];
        player[key] = resultSets[0].rowSet[i][j];
      }
      statArray.push(player);
    }
    res.json(statArray);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.get("/lastGameStats", async (req, res, next) => {
  try {
    const URL =
      "https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=1&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=";
    const config = { headers: { "Content-Type": "application/json", Referer: "https://www.nba.com/", "Cache-Control": "no-cache" } };
    const {
      data: { resultSets },
    } = await axios.get(URL, config);
    let tableHeaders = "";
    let tableBody = "";

    for (i = 0; i < resultSets[0].headers.length; i++) {
      tableHeaders += `<th>${resultSets[0].headers[i]}</th>`;
    }

    for (i = 0; i < resultSets[0].rowSet.length; i++) {
      let rowData = "";
      for (j = 0; j < resultSets[0].rowSet[i].length; j++) {
        rowData += `<td>${resultSets[0].rowSet[i][j]}</td>`;
        if (j === resultSets[0].rowSet[i].length - 1) {
          rowData += "</tr>";
          tableBody += rowData;
        }
      }
    }
    const html = `<table><tr>${tableHeaders}</tr>${tableBody}</table>`;
    res.send(html);
  } catch (error) {
    console.log("ERROR", error);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log("App is up at " + port);
});
