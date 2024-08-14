export const formatTemperature = (temperature: number) : number => {
  const kelvin = 275.15
  return parseInt((temperature - kelvin).toString());
}
