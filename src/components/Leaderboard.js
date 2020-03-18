import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";

import DataTable from "./DataTable";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}));

export const Leaderboard = ({ title, description, rows, fields, ...rest }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">{title}</Typography>
      {rows ? (
        <DataTable
          rows={rows}
          fields={fields}
          rowsPerPage={10}
          {...rest}
          sortField={fields ? fields[0] : "state"}
        />
      ) : null}
    </Paper>
  );
};
