// this function is based on prisma / db format
import type { Project } from '@prisma/client';

export const yearMonthDayFormat = (dateToFormat: Date) => {
  const dateFromDB = dateToFormat.toString().split(' ');
  return new Date(dateFromDB[0]);
};

export const displayMostRecentFirst = (data: Project[]) =>
  // @ts-ignore
  data.sort((a, b) => yearMonthDayFormat(b.createdAt) - yearMonthDayFormat(a.createdAt));
