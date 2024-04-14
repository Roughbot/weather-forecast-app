"use client";
import { useEffect, useState } from "react";
import FirstDataContainer from "./container";

interface WeatherDataType {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: CityInfo;
}

interface WeatherEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

const WeatherCard = ({ cityName }: { cityName: string }) => {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();

  useEffect(() => {
    weatherDataFunction(cityName);
  }, [cityName]);

  const weatherDataFunction = async (slug: string) => {
    const response = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=%22${slug}%22`
    );
    const data = await response.json();

    const latitude = data.results[0].coordinates.lat;
    const longitude = data.results[0].coordinates.lon;

    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
    );

    const responseData = await weatherData.json();
    setWeatherData(responseData);
  };

  
  if (!weatherData) {
    return (
      <div className="flex items-center justify-center p-20">
        <h3 className="text-4xl text-center font-semibold text-blue-700">
          Loading...
        </h3>
      </div>
    );
  }

  return (
    <div>
      <div className="glass_morphism p-6">
        <FirstDataContainer weatherData={weatherData} />
      </div>
    </div>
  );
};

export default WeatherCard;
