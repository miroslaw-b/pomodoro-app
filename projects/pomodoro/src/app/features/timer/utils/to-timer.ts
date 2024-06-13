import { withZeroSuffix } from './with-zero-suffix';

export function toTimer(scheduledTime: number): string {
  const milliseconds = scheduledTime;
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (60 * 1000)) % 60);

  return `${withZeroSuffix(minutes)}:${withZeroSuffix(seconds)}`;
}
