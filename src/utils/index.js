export const formatPercent = percent => `${(percent * 100).toFixed(1)}%`;

const formatter = new Intl.NumberFormat("en-us");

export const formatNumber = number => formatter.format(number);