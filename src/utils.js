export const USD = "USD";
export const GBP = "GBP";
export const EUR = "EUR";

export const UnitedStatesDollar = "United States Dollar (USD)";
export const BritishPoundSterling = "British Pound Sterling (GBP)";
export const Euro = "Euro (EUR)";

export const API = (currency) =>
  `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=2013-09-01&end=2013-09-10`;
