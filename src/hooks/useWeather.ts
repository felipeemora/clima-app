import axios from "axios";
import { SearchType } from "../types";
import { object, string, number, InferOutput, parse } from 'valibot';
import { useMemo, useState } from "react";


// Valibot
const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number(),
  })
})

export type Weather = InferOutput<typeof WeatherSchema>;

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

export const useWeather = () => {

  const [weather, setWeather] = useState<Weather>(initialState)

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (searh: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    setWeather(initialState);
    setLoading(true);

    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searh.city},${searh.city}&appid=${apiKey}`;
      const { data } = await axios(geoUrl);

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;
      
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      
      const { data: weatherResult } = await axios(weatherUrl);
      const result = parse(WeatherSchema, weatherResult);
      if (result) {
        setWeather(result);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    loading,
    weather,
    notFound,
    hasWeatherData,
    fetchWeather
  }
} 