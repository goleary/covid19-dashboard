import groupBy from "lodash/groupBy";
import map from "lodash/map";

export const getStateData = async () => {
  const data = await fetch("https://covidtracking.com/api/states/daily");
  const grouped = groupBy(await data.json(), datapoint => datapoint.state);
  return map(grouped, processState);
};
const processState = state => {
  state = state.sort((a, b) => b.date - a.date);

  let delta1Tests = null,
    delta1Positive = null,
    delta1Death = null;
  if (state[1]) {
    delta1Tests = state[0].total - state[1].total;
    delta1Positive = state[0].positive - state[1].positive;
    delta1Death = state[0].death - state[1].death;
  }

  let delta7Tests = null,
    delta7Positive = null,
    delta7Death = null;
  if (state[6]) {
    delta7Tests = state[0].total - state[6].total;
    delta7Positive = state[0].positive - state[6].positive;
    delta7Death = state[0].death - state[6].death;
  }
  return {
    state: state[0].state,
    tests: state[0].total,
    delta1Tests,
    delta7Tests,
    positive: state[0].positive,
    delta1Positive,
    delta7Positive,
    positiveRate: state[0].positive / state[0].total,
    positiveRate1: delta1Positive / delta1Tests,
    positiveRate7: delta7Positive / delta7Tests,
    death: state[0].death ? state[0].death : 0,
    delta1Death,
    delta7Death,
    date: state[0].date,
    lastUpdate: state[0].dateChecked
  };
};

export const getCountryData = async () => {
  const request = await fetch("https://covidtracking.com/api/us/daily");
  const data = await request.json();
  return processState(data);
};

export const getCurrentCountryData = async()=>{
  const request = await fetch("https://covidtracking.com/api/us");
  const data = await request.json();
  return data[0];
}
