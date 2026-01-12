export function pluralize(
  singular: string,
  plural: string,
  value?: number
): string {
  return `${value !== 1 ? plural : singular}`;
}
