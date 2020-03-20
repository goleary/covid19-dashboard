export const formatPercent = percent => `${(percent * 100).toFixed(1)}%`;

const formatter = new Intl.NumberFormat("en-us");

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

export const processState = state => {
  state = state.map(processDay);
  for (let i = 0; i < state.length - 1; i++) {
    state[i].newTests = state[i].tests - state[i + 1].tests;
    state[i].newConfirmed = state[i].confirmed - state[i + 1].confirmed;
    state[i].newDeaths = state[i].deaths - state[i + 1].deaths;
    // not nulling the values below means we can't use log scale on the bar chart
    // but there is a weird formatting issue if we null the values
/*
    state[i].newTests = state[i].newTests > 0 ? state[i].newTests : null;
    state[i].newConfirmed =
      state[i].newConfirmed > 0 ? state[i].newConfirmed : null;
    state[i].newDeaths = state[i].newDeaths > 0 ? state[i].newDeaths : null;
  */}
  return state;
};
