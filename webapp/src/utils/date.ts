export const yesterday = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

export const yearsBefore = (date: Date, years: number): Date => {
  date.setFullYear(date.getFullYear() - years);
  return date;
};

export const firstDayLastMonth = (): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  return date;
};
