export function getGraphLabels(
  date: Date,
  numOfMonths: number,
  currentBigNumberId: string
): string[] {
  date = new Date(date);
  const labels: string[] = [];
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  if (currentBigNumberId === "oil_products_prices") {
    // Custom logic for oil_products_prices
    for (let i = 0; i < numOfMonths; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() - i);
      labels.unshift(formatDate(currentDate));
    }
  } else {
    for (let i = 0; i < numOfMonths; i++) {
      const currentMonth = date.getMonth() - i;
      const currentYear = date.getFullYear();
      const previousMonth = (currentMonth + 12) % 12;
      const previousYear = currentMonth <= 0 ? currentYear - 1 : currentYear;

      labels.unshift(`${monthNames[previousMonth % 12]} ${previousYear}`);
    }
  }

  return labels;
}

// Helper function to format date as "dd monthName yyyy"
function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleDateString("ru-RU", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
