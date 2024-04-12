"use client";
import { useEffect, useState } from "react";

const WeatherCard = ({ cityName }: { cityName: string }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
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

  return (
    <div>
      <div className="glass_morphism p-6">
        {weatherData && (
          <h2 className="text-3xl font-semibold text-yellow-300 text-balance">
            {weatherData.list[0].weather[0].description}
          </h2>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
