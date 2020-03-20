import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  makeStyles,
  Switch,
  Typography
} from "@material-ui/core";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatDate, formatNumber } from "../utils";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));
const LogInfo = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = event => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
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
            way that doesn't obscure the growth in either of the series.
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

export const RawChart = ({ data }) => {
  const [useLog, setUseLog] = useState(false);
  const [hide, setHide] = useState({
    tests: true,
    newTests: true,
    confirmed: false,
    newConfirmed: false,
    deaths: false,
    newDeaths: false
  });

  const handleLegendClick = event => {
    setHide({ ...hide, [event.dataKey]: !hide[event.dataKey] });
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6">Cummulative totals</Typography>
        <FormGroup>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={useLog}
                  onChange={() => setUseLog(!useLog)}
                  color="primary"
                />
              }
              label="Use Log Scale"
              style={{ marginRight: "5px" }}
            />
            <LogInfo />
          </div>
        </FormGroup>
      </div>

      <ResponsiveContainer height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <YAxis
            tickFormatter={formatNumber}
            scale={useLog ? "log" : "linear"}
            domain={["1", "dataMax"]}
          />
          <XAxis dataKey="date" />
          <Tooltip formatter={formatNumber} />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="tests"
            stroke="#82ca9d"
            fill="#82ca9d"
            hide={hide.tests}
          />
          <Area
            type="monotone"
            dataKey="confirmed"
            stroke="#ffc658"
            fill="#ffc658"
            hide={hide.confirmed}
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stroke="#e57373"
            fill="#e57373"
            hide={hide.deaths}
          />
          <Legend onClick={handleLegendClick} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "center" }}>
        <Typography variant="caption">
          click on legend to toggle series
        </Typography>
      </div>
      <Typography variant="h6">Daily Stats</Typography>
      <ResponsiveContainer height={300}>
        <BarChart
          data={data}
          height={200}
          width={400}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <YAxis tickFormatter={formatNumber} />
          <XAxis dataKey="date" />
          <Tooltip formatter={formatNumber} />
          <CartesianGrid stroke="#f5f5f5" />
          <Legend onClick={handleLegendClick} />
          <Bar
            type="monotone"
            dataKey="newDeaths"
            stroke="#e57373"
            fill="#e57373"
            hide={hide.newDeaths}
          />
          <Bar
            type="monotone"
            dataKey="newConfirmed"
            stroke="#ffc658"
            fill="#ffc658"
            hide={hide.newConfirmed}
          />
          <Bar
            type="monotone"
            dataKey="newTests"
            stroke="#82ca9d"
            fill="#82ca9d"
            hide={hide.newTests}
          />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "center" }}>
        <Typography variant="caption">
          click on legend to toggle series
        </Typography>
      </div>
    </div>
  );
};
