export function metersToKilometers(meters: number) {
  const kilometers = meters / 1000;
  return `${kilometers.toFixed(0)}km`;
}
