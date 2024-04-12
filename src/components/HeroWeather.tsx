"use client";
import { useEffect, useState } from "react";

const HeroWeather = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [cityName, setCityName] = useState("");

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getCityName(position.coords.latitude, position.coords.longitude);
        getWeatherData(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const getCityName = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );
    const data = await response.json();
    setCityName(data.results[0].components._normalized_city);
    console.log(data);
  };
  const getWeatherData = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
    );
    const data = await response.json();
    setWeatherData(data);
  };
  return (
    <div className="items-center flex flex-col justify-center pt-4">
      <h2 className="text-4xl text-blue-500 font-bold ">Weather Forecast</h2>
      <div className="mt-4 p-4 glass_morphism">
        <p>Latitude: {location?.latitude}</p>
        <p>Longitude: {location?.longitude}</p>
        <p>City: {cityName}</p>
      </div>
    </div>
  );
};

export default HeroWeather;
