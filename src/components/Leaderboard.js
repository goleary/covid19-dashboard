import React, { useEffect, useState } from "react";

import DataTable from "./DataTable";
import { getStateData, getCountryData } from "../services/covidtracking";

export const Leaderboard = () => {
  const [result, setResult] = useState(null);
  const [totals, setTotals] = useState(null);
  useEffect(() => {
    getStateData().then(data => setResult(data));
    getCountryData().then(data => setTotals(data));
  }, []);

  return (
    <div>{result ? <DataTable rows={result} totals={totals} /> : null}</div>
  );
};
