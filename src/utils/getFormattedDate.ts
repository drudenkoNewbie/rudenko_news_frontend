const DATE_START = 0;
const DATE_END = 10;

export const getFormattedDate = (date: Date): string => String(date).slice(DATE_START, DATE_END);
