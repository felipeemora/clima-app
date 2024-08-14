// import { z } from "zod";

// Type guard o assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number'
//   )
// }

// Zod
// const Weather = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_max: z.number(),
//     temp_min: z.number(),
//   })
// })

// type Weather = z.infer <typeof Weather>;

// Castear la respuesta al type: Bad ❎                                                    
// const { data: weatherResult } = await axios<Weather>(weatherUrl);
// console.log(weatherResult.name)

// Type Guards: Bad ❎  Poco mantenible y escalable
// const { data: weatherResult } = await axios(weatherUrl);
// const result = isWeatherResponse(weatherResult);
// if (result) {
//   console.log(weatherResult.name);
// }

// Zod: Buena pero algo pesada porque no es modular ✅
// const { data: weatherResult } = await axios(weatherUrl);
// const result = Weather.safeParse(weatherResult);
// if (result.success) {
//   console.log(result.data.main.temp)
// }

// Valibot: La mejor, modular ✅