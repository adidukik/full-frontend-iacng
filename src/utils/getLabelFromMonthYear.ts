export function getLabelFromMonthYear(
  year: number,
  monthNumber: number
): string {
  // Create an array of month names in Russian
  // const monthNames = [
  //   "Январь",
  //   "Февраль",
  //   "Март",
  //   "Апрель",
  //   "Май",
  //   "Июнь",
  //   "Июль",
  //   "Август",
  //   "Сентябрь",
  //   "Октябрь",
  //   "Ноябрь",
  //   "Декабрь",
  // ];

  // Validate the month number (1 to 12)
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Month number should be between 1 and 12");
  }

  // // Create a Date object for the specified year and month
  // const date = new Date(year, monthNumber - 1);

  // // Get the Russian month name
  // const monthName = monthNames[date.getMonth()];

  // Format the result
  const monthStr = String(monthNumber);
  const formattedDate = `${monthStr.length < 2 ? "0" + monthStr : monthStr}.${
    year - 2000
  }`;

  return formattedDate;
}
