import { formatToTimeZone, parseFromTimeZone } from 'date-fns-timezone';
import { formatTimestampDate, getBrowserTimezone } from "../../helpers";

export function notificationDateFormat(date: string) {
  const zonedDate = parseFromTimeZone(date, {
    timeZone: 'UTC',
  });

  const dateObject = new Date(zonedDate);
  let formattedTime = null;
  try {
    formattedTime = formatToTimeZone(dateObject, 'MM/DD/YY', {
      timeZone: getBrowserTimezone(),
    });
  } catch (e) {
    console.error(e);
  }

  return formatTimestampDate(date, getBrowserTimezone()) || formattedTime || null;
}
