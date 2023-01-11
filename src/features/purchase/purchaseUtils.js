import moment from 'moment';

export const sortByName = (a = '', b = '') => {
  const aName = a.toString().toLowerCase();
  const bName = b.toString().toLowerCase();

  return aName < bName ? -1 : aName > bName ? 1 : 0;
};

export const calculatePoints = amount => {
  const extraPoints = amount > 100 ? (amount - 100) * 2 : 0;
  const points = amount > 100 ? 50 : amount < 50 ? 0 : amount - 50;

  return points + extraPoints;
};

export const randomDate = () => {
  const end = moment();
  const start = moment().add(-3, 'month');
  return new Date(+start + Math.random() * (end - start)).toString();
};

export const getMinDateFromArray = array => {
  return new Date(Math.min(...array.map(p => moment(p.date)))).toString();
};

export const getMaxDateFromArray = array => {
  return new Date(Math.max(...array.map(p => moment(p.date)))).toString();
};

export const calculateTotalAmount = array => array.map(p => p.amount).reduce((a, b) => a + b, 0);
export const calculateTotalPoints = array => array.map(p => calculatePoints(p.amount)).reduce((a, b) => a + b, 0);

export const formatHistoryData = array =>
  array.map(x => ({
    customer: x.customer,
    dates: [getMinDateFromArray(x.purchases), getMaxDateFromArray(x.purchases)],
    totalAmount: calculateTotalAmount(x.purchases),
    totalPoints: calculateTotalPoints(x.purchases),
  }));

export const formatDates = dates => `${moment(dates[0]).format('MMM Do YY')} - ${moment(dates[1]).format('MMM Do YY')}`;
