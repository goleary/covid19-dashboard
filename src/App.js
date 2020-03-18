import React from "react";
import { Container } from "@material-ui/core";
import "./App.css";

import { Leaderboard } from "./components/Leaderboard";

function App() {
  return (
    <div className="App">
      <Container>
        <Leaderboard />
      </Container>
      <footer>
        <p>
          built by <a href="https://gabeoleary.com">Gabe O'Leary</a>
        </p>
        data from{" "}
        <a href="https://covidtracking.com/">The COVID Tracking Project</a>
      </footer>
    </div>
  );
}

export default App;
