/**
 * @example return string with hour and minutes like 12:34
 */
export function toTime(endsAt: number) {
  return Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(endsAt));
}
