import React, { useContext, useState, useEffect } from "react";

import { makeStyles, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { getCurrentStateData } from "../services/covidtracking";
import StateContext from "../context/State";
import { processState } from "../utils";
import { RawChart } from "./RawChart";
import { ChipStatus } from "./ChipStatus";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "95%",
    margin: "5px"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export const StateView = ({ state, handleClose }) => {
  const classes = useStyles();

  const [currentTotals, setCurrentTotals] = useState(null);
  const { rawData, rawTotals } = useContext(StateContext);

  useEffect(() => {
    getCurrentStateData(state).then(data => setCurrentTotals(data));
  }, []);
  if (!rawData && !rawTotals) return null;
  let data;
  if (state) data = rawData[state];
  else data = rawTotals;

  data = processState(data)
    .slice()
    .reverse();

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.paper // class name, e.g. `classes-nesting-root-x`
      }}
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
        {currentTotals ? (
          <React.Fragment>
            <Typography variant="caption">
              last update: {currentTotals.lastUpdateEt} (EST)
            </Typography>
            <ChipStatus currentTotals={currentTotals} />
          </React.Fragment>
        ) : null}
        <RawChart data={data} />
      </DialogContent>
    </Dialog>
  );
};
