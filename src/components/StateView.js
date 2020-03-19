import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Legend
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

  const [useLog, setUseLog] = useState(false);
  const [showTests, setShowTests] = useState(true);

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
          <YAxis scale={useLog ? "log" : "linear"} domain={["1", "dataMax"]} />
          <XAxis dataKey="date" />
          <Tooltip formatter={formatNumber} />
          <CartesianGrid stroke="#f5f5f5" />
          {showTests ? (
            <Area
              type="monotone"
              dataKey="tests"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          ) : null}
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
          <Legend />
        </AreaChart>
        <FormGroup>
          <div style={{ display: "flex", "flex-direction": "row" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={useLog}
                  onChange={() => setUseLog(!useLog)}
                  color="primary"
                />
              }
              label="Use Log Scale"
              style={{ "margin-right": "5px" }}
            />
            <LogInfo />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={showTests}
                onChange={() => setShowTests(!showTests)}
                color="primary"
              />
            }
            label="Show Tests"
          />
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
};

const LogInfo = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = event => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div style={{ display: "flex", "align-items": "center" }}>
      <InfoOutlinedIcon onClick={handleOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Why use log scale?
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A logarithmic scale enables the chart to display different series
            with both small and large magnitude (# of deaths vs # of tests) in a
            way that doesn't obscure the growth of either of the series.
            <p>
              Learn more{" "}
              <a
                href="https://blog.datawrapper.de/weeklychart-logscale/"
                target="_new"
              >
                here
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
