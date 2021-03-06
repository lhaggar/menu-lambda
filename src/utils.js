// Util to get day word (i.e. cafe section name) from date.
const getDay = date => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return days[date.getDay()];
};

const isWeekend = date => ['saturday', 'sunday'].includes(getDay(date));

module.exports = { getDay, isWeekend };
