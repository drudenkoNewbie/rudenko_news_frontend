import { DateTime } from 'luxon';

export const getFormattedDate = (date: Date): string =>
  DateTime.fromISO(String(date)).toFormat('MMMM d, yyyy');
