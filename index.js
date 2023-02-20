const express = require("express");
const app = express();
const port = 5000;
const axios = require("axios").default;

app.get("/", (req, res, next) => {
  try {
    res.json({ msg: "Hi" });
  } catch (error) {
    console.log(error);
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
      let rowData = "<tr>";
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
    // let template_table_header = {
    //   "<>": "tr",
    //   html: [],
    // };
    // let template_table_body = {
    //   "<>": "tr",
    //   html: [],
    // };

    // for (i = 0; i < resultSets[0].headers.length; i++) {
    //   template_table_header.html.push({ "<>": "th", html: resultSets[0].headers[i] });
    // }
    // for (i = 0; i < resultSets[0].rowSet.length; i++) {
    //   for (j = 0; j < resultSets[0].rowSet[i].length; j++) {
    //     template_table_body.html.push({ "<>": "td", html: resultSets[0].rowSet[i][j] });
    //   }
    // }
    // console.log(template_table_body);
    // let table_header = json2html.transform(resultSets[0].headers, template_table_header);
    // let table_body = "";
    // for (i = 0; i < resultSets[0].rowSet.length; i++) {
    //   for (j = 0; j < resultSets[0].rowSet[i].length; j++) {
    //     table_body += json2html.transform(resultSets[0].rowSet[i][j], template_table_header);
    //   }
    // }
    // res.send(table_header);
  } catch (error) {
    console.log("ERROR", error);
  }
});

app.listen(port, () => {
  console.log("App is up at " + port);
});