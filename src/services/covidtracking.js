import groupBy from "lodash/groupBy";
import map from "lodash/map";

export const getStateData = async () => {
  const data = await fetch("https://covidtracking.com/api/states/daily");
  const grouped = groupBy(await data.json(), datapoint => datapoint.state);
  return map(grouped, processState);
};
const processState = state => {
  state = state.sort((a, b) => b.date - a.date);
  const deltaTests = state[0].total - state[1].total;
  const deltaPositive = state[0].positive - state[1].positive;
  const deltaDeath = state[0].death - state[1].death;
  return {
    state: state[0].state,
    tests: state[0].total,
    deltaTests,
    positive: state[0].positive,
    deltaPositive,
    positiveRate: (state[0].positive / state[0].total) * 100,
    death: state[0].death ? state[0].death : 0,
    deltaDeath
  };
};

export const getCountryData = async () => {
  const request = await fetch("https://covidtracking.com/api/us/daily");
  let data = await request.json();
  return processState(data);
};
