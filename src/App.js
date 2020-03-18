import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import "./App.css";

import { Leaderboard } from "./components/Leaderboard";

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
        <Leaderboard />
      </Container>
      <footer className={classes.footer}>
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
