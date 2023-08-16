export function getGraphLabels(date: Date, numOfMonths: number): string[] {
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

  for (let i = 0; i < numOfMonths; i++) {
    const currentMonth = date.getMonth() - i;
    const currentYear = date.getFullYear();
    const previousMonth = (currentMonth + 12) % 12;
    const previousYear = currentMonth <= 0 ? currentYear - 1 : currentYear;

    labels.push(`${monthNames[previousMonth % 12]} ${previousYear}`);
  }

  return labels;
}
