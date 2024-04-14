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

const HeroWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();

  console.log(weatherData);

  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getWeatherData(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const getWeatherData = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
    );
    const data = await response.json();
    setWeatherData(data);
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
    <div className=" flex flex-col  pt-4">
      <h2 className="text-4xl font-bold text-center">Weather Forecast</h2>
      <div className="m-4 p-4 glass_morphism ">
        <FirstDataContainer weatherData={weatherData} />
      </div>
    </div>
  );
};

export default HeroWeather;
