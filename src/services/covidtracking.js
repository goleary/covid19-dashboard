import groupBy from "lodash/groupBy";
import map from "lodash/map";

export const getStateData = async setRawData => {
  const data = await fetch("https://covidtracking.com/api/states/daily");
  const grouped = groupBy(await data.json(), datapoint => datapoint.state);
  setRawData(grouped);
  return map(grouped, processState);
};
const processState = state => {
  state = state.sort((a, b) => b.date - a.date);

  let tests = state[0].positive + state[0].negative;

  let delta1Tests = null,
    delta1Positive = null,
    delta1Death = null;
  if (state[1]) {
    const tests1 = state[1].positive + state[1].negative;
    delta1Tests = tests - tests1;
    delta1Positive = state[0].positive - state[1].positive;
    delta1Death = state[0].death - state[1].death;
  }

  let delta7Tests = null,
    delta7Positive = null,
    delta7Death = null;
  if (state[6]) {
    const tests7 = state[6].positive + state[6].negative;
    delta7Tests = tests - tests7;
    delta7Positive = state[0].positive - state[6].positive;
    delta7Death = state[0].death - state[6].death;
  }
  return {
    state: state[0].state,
    tests,
    delta1Tests,
    delta7Tests,
    positive: state[0].positive,
    delta1Positive,
    delta7Positive,
    positiveRate: state[0].positive / tests,
    positiveRate1: delta1Positive / delta1Tests,
    positiveRate7: delta7Positive / delta7Tests,
    death: state[0].death ? state[0].death : 0,
    delta1Death,
    delta7Death,
    date: state[0].date,
    lastUpdate: state[0].dateChecked
  };
};

export const getCountryData = async setRawTotals => {
  const request = await fetch("https://covidtracking.com/api/us/daily");
  const data = await request.json();
  setRawTotals(data);
  return processState(data);
};

export const getCurrentCountryData = async () => {
  const request = await fetch("https://covidtracking.com/api/us");
  const data = await request.json();
  return data[0];
};

export const getCurrentStateData = async state => {
  const request = await fetch(
    state
      ? "https://covidtracking.com/api/states?state=" + state
      : "https://covidtracking.com/api/us"
  );
  const data = await request.json();
  return data;
};
