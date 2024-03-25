export const yesterday = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

export const getYearMonthDay = (date: Date | string): { year: string, month: string, day: string }  => {
  const splittedDateParts = new Date(date).toISOString().split('T')[0].split('-');
  const year = splittedDateParts[0];
  const month = splittedDateParts[1];
  const day = splittedDateParts[2];

  return { year, month, day };
}
