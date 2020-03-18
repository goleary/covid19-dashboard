import React, { useEffect, useState } from "react";

import { Paper, makeStyles, Typography } from "@material-ui/core";

import DataTable from "./DataTable";
import { getStateData, getCountryData } from "../services/covidtracking";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export const Leaderboard = () => {
  const [result, setResult] = useState(null);
  const [totals, setTotals] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    getStateData().then(data => setResult(data));
    getCountryData().then(data => setTotals(data));
  }, []);

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h3">US COVID19 Dashboard</Typography>
        {result ? <DataTable rows={result} totals={totals} /> : null}
      </Paper>
    </div>
  );
};
