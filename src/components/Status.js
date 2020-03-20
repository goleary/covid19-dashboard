import React, { useContext } from "react";
import { Paper, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import StateContext from "../context/State";

import { processState } from "../utils";
import { RawChart } from "./RawChart";
import { ChipStatus } from "./ChipStatus";
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

  const { rawTotals } = useContext(StateContext);
  if (!rawTotals) return null;
  const data = processState(rawTotals)
    .slice()
    .reverse();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Nationwide Status</Typography>
      <Typography variant="caption">{now.toString()}</Typography>
      <ChipStatus currentTotals={currentTotals} />
      <RawChart data={data} />
    </Paper>
  );
};
