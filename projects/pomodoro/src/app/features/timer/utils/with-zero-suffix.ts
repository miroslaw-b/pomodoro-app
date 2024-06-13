export function withZeroSuffix(value: number): string {
  return `${value < 10 ? 0 : ''}${value}`;
}
