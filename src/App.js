import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import "./App.css";

import { Dashboard } from "./components/Dashboard";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(1)
  }
}));
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container>
        <Dashboard />
      </Container>
      <footer className={classes.footer}>
        <p>
          <a href="https://twitter.com/g0leary">tweet at me</a> with issues or
          suggestions.
        </p>
        <p>
          built by <a href="https://gabeoleary.com">Gabe O'Leary</a>
        </p>
        <p>
          data from{" "}
          <a href="https://covidtracking.com/">The COVID Tracking Project</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
