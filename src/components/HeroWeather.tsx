"use client";
import { useEffect, useState } from "react";

const HeroWeather = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [cityName, setCityName] = useState("");
  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getCityName(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const getCityName = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=877c41d9c7044d3fb1d9b9b961918356`
    );
    const data = await response.json();
    console.log(data);
    setCityName(data.results[0].components._normalized_city);
  };

  return (
    <div className="items-center flex flex-col justify-center pt-4">
      <h2 className="text-4xl text-blue-500 font-bold ">Weather Forecast</h2>
      <div className="py-4">
        <p>Latitude: {location?.latitude}</p>
        <p>Longitude: {location?.longitude}</p>
        <p>City: {cityName}</p>
      </div>
    </div>
  );
};

export default HeroWeather;
