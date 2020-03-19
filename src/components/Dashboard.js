import React, { useEffect, useState } from "react";

import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";

import { Status } from "./Status";
import { Leaderboard } from "./Leaderboard";
import { StateView } from "./StateView";
import {
  getStateData,
  getCountryData,
  getCurrentCountryData
} from "../services/covidtracking";

import { StateProvider } from "../context/State";

import { formatDate } from "../utils";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  grid: {
    marginTop: theme.spacing(1)
  }
}));

export const Dashboard = () => {
  const [rawData, setRawData] = useState(null);
  const [result, setResult] = useState(null);

  const [totals, setTotals] = useState(null);
  const [rawTotals, setRawTotals] = useState(null);
  const [currentTotals, setCurrentTotals] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getStateData(setRawData).then(data => setResult(data));
    getCountryData(setRawTotals).then(data => setTotals(data));
    getCurrentCountryData().then(data => setCurrentTotals(data));
  }, []);

  return (
    <StateProvider value={{ rawData, rawTotals }}>
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h3">USA COVID19 Dashboard</Typography>
          {currentTotals ? <Status currentTotals={currentTotals} /> : null}
          <Typography variant="h5">
            Daily Totals - {totals && formatDate(totals.date)}
          </Typography>

          <Typography variant="subtitle1">
            The below numbers are updated between 4 & 5pm eastern time every
            day. For more info on the data visit{" "}
            <a href="https://covidtracking.com/">The COVID Tracking Project</a>
          </Typography>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={3}
            className={classes.grid}
          >
            <Grid item xs={12} sm={6}>
              <Leaderboard
                rows={result}
                totals={totals}
                title={"Testing"}
                description={
                  "It's import to see what states are testing and how many tests are being performed daily.  Only by accurately identifying & quantifying the problem can we solve "
                }
                fields={["tests", "delta1Tests", "delta7Tests"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Leaderboard
                rows={result}
                totals={totals}
                title={"Confirmed Cases"}
                description={"test description"}
                fields={["positive", "delta1Positive", "delta7Positive"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Leaderboard
                rows={result}
                totals={totals}
                title={"% Positive Rate"}
                description={"test description"}
                fields={["positiveRate", "positiveRate1", "positiveRate7"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Leaderboard
                rows={result}
                totals={totals}
                title="Deaths"
                description={"test description"}
                fields={["death", "delta1Death", "delta7Death"]}
              />
            </Grid>
          </Grid>
          {result ? (
            <Leaderboard title="All Data" rows={result} totals={totals} />
          ) : null}
        </Paper>
      </div>
    </StateProvider>
  );
};
