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
