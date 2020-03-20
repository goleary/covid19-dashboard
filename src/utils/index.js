export const formatPercent = percent => `${(percent * 100).toFixed(1)}%`;

const formatter = new Intl.NumberFormat("en-us", { maximumFractionDigits: 1 });

export const formatNumber = number => formatter.format(number);

export const formatDate = (date, includeYear = true) => {
  let str = date.toString();
  const year = str.substring(0, 4);
  const month = str.substring(4, 6);
  const day = str.substring(6);
  return `${month}/${day}` + (includeYear ? `/${year}` : "");
};

// data must not have any 0s or the chart log scale doesn't work. null values are fine

const processDay = day => ({
  date: formatDate(day.date, false),
  deaths: day.death > 0 ? day.death : null,
  confirmed: day.positive > 0 ? day.positive : null,
  negative: day.negative > 0 ? day.negative : null,
  tests: day.positive + day.negative > 0 ? day.positive + day.negative : null
});

const calcMovingAverages = (array, n) => {
  let avg = new Array(array.length).fill(0);
  for (let i = 0; i <= array.length - n; i++) {
    let sum = array.slice(i, n + i).reduce((a, b) => a + b);
    avg[i] = sum / n;
  }
  return avg;
};

const addMovingAverages = (state, field, n) => {
  let values = state.map(day => day[field]);
  const averages = calcMovingAverages(values, n);
  console.log("averages: ", averages);
  averages.forEach((value, index) => {
    state[index][`${field}_${n}d_avg`] = value;
  });
  return state;
};

export const processState = state => {
  state = state.map(processDay);
  for (let i = 0; i < state.length; i++) {
    if (i < state.length - 1) {
      // calculate daly deltas
      state[i].newTests = state[i].tests - state[i + 1].tests;
      state[i].newConfirmed = state[i].confirmed - state[i + 1].confirmed;
      state[i].newDeaths = state[i].deaths - state[i + 1].deaths;
    } else {
      // could also use initial values here but this may be misleading
      state[i].newTests = 0;
      state[i].newConfirmed = 0;
      state[i].newDeaths = 0;
    }
    // not nulling the values below means we can't use log scale on the bar chart
    // but there is a weird formatting issue if we null the values
    /*
    state[i].newTests = state[i].newTests > 0 ? state[i].newTests : null;
    state[i].newConfirmed =
      state[i].newConfirmed > 0 ? state[i].newConfirmed : null;
    state[i].newDeaths = state[i].newDeaths > 0 ? state[i].newDeaths : null;
  */
  }
  addMovingAverages(state, "newTests", 7);
  addMovingAverages(state, "newConfirmed", 7);
  addMovingAverages(state, "newDeaths", 7);
  return state;
};
