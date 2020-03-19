import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import CloseIcon from "@material-ui/icons/Close";

import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area
} from "recharts";

import StateContext from "../context/State";
import { formatDate, formatNumber } from "../utils";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export const StateView = ({ state, open, handleClose }) => {
  const classes = useStyles();

  const { rawData, rawTotals } = useContext(StateContext);

  if (!rawData && !rawTotals) return;
  let data;
  if (state) data = rawData[state];
  else data = rawTotals;
  data = data
    .map(elem => ({
      date: formatDate(elem.date, false),
      deaths: elem.death > 0 ? elem.death : null,
      confirmed: elem.positive > 0 ? elem.positive : null,
      negative: elem.negative > 0 ? elem.negative : null,
      tests:
        elem.positive + elem.negative > 0 ? elem.positive + elem.negative : null
    }))
    .reverse();

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {state ? state : "USA"}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <YAxis scale="log" domain={["1", "dataMax"]} />
          <XAxis dataKey="date" />
          <Tooltip formatter={formatNumber} />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="tests"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="confirmed"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#e57373"
            fill="#e57373"
          />
        </AreaChart>
      </DialogContent>
    </Dialog>
  );
};
