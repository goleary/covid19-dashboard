import React from "react";
import { Paper, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

import { formatNumber } from "../utils";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  container: {
    margin: theme.spacing(2)
  },
  chip: {
    height: "48px",
    borderRadius: "24px",
    fontSize: "larger",
    fontWeight: 500,
    margin: theme.spacing(1)
  },
  chipItem: {
    display: "flex",
    justifyContent: "center"
  },
  tests: {
    color: theme.palette.success.light,
    borderColor: theme.palette.success.light
  },
  confirmed: {
    color: theme.palette.warning.light,
    borderColor: theme.palette.warning.light
  },
  deaths: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light
  }
}));
export const Status = ({ currentTotals }) => {
  const classes = useStyles();
  const now = new Date();
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Nationwide Status</Typography>
      <Typography variant="caption">{now.toString()}</Typography>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={4} className={classes.chipItem}>
          <Chip
            variant="outlined"
            className={clsx(classes.chip, classes.tests)}
            label={`${formatNumber(currentTotals.total)} Tests`}
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.chipItem}>
          <Chip
            variant="outlined"
            className={clsx(classes.chip, classes.confirmed)}
            label={`${formatNumber(currentTotals.positive)} Confirmed`}
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.chipItem}>
          <Chip
            variant="outlined"
            className={clsx(classes.chip, classes.deaths)}
            label={`${formatNumber(currentTotals.death)} Deaths`}
            size="medium"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
