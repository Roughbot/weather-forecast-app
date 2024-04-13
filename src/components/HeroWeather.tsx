"use client";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

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

  const firstData = weatherData?.list[0];

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
    return <div>Loading...</div>;
  }

  return (
    <div className="items-center flex flex-col justify-center pt-4">
      <h2 className="text-4xl text-blue-500 font-bold ">Weather Forecast</h2>
      <div className="m-4 p-4 glass_morphism items-center justify-center ">
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-center">
              <p>
                {firstData?.dt_txt
                  ? format(parseISO(firstData?.dt_txt ?? ""), "EEEE")
                  : "Invalid date"}
              </p>
            </h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroWeather;
