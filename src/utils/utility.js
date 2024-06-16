function getStartAndEndTime(dateString) {
  let date = new Date(dateString);
  let [month, day, year] = date.toLocaleDateString().split("-");
  date = new Date(+year, +month + membershipDuration - 1, +day + 1);
  return { startDate, endDate };
}

module.exports = { getStartAndEndTime };
