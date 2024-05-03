import React from "react";
import { weatherDetailsProps } from "./weatherDetails";
import Image from "next/image";
import WeatherDetails from "@/components/weatherDetails";
import { useDispatch, useSelector } from "react-redux";
import { toggleTemperatureUnit } from "@/features/convertSlice";
import { convertCelciusToFarenheit } from "@/app/utils/tempConverter";

export interface forecastWeatherDetailsProps extends weatherDetailsProps {
  weatherIcon: string;
  description: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

const FiveDaysWeather = (props: forecastWeatherDetailsProps) => {
  const {
    weatherIcon,
    description,
    date,
    day,
    temp,
    feels_like,
    temp_min,
    temp_max,
  } = props;

  const dispatch = useDispatch();
  const isCelsius = useSelector((state: any) => state.temperature.isCelsius);

  const handleToggleTemperatureUnit = () => {
    dispatch(toggleTemperatureUnit());
  };

  const displayTemperature = (temp: number) => {
    if (isCelsius) {
      return `${Math.floor(temp)}°C`;
    } else {
      return `${Math.floor(convertCelciusToFarenheit(temp))}°F`;
    }
  };

  return (
    <div className="w-full bg-white border rounded-lg glass_morphism flex sm:flex-row flex-col py-4 shadow-md gap-4">
      <section className="flex gap-4 justify-around items-center px-4">
        <div className="items-center justify-center flex flex-col">
          <div className="relative h-20 w-20">
            <Image
              src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
              alt="weather icon"
              width={100}
              height={100}
              className="absolute w-full h-full"
            />
          </div>
          <p>{date}</p>
          <p>{day}</p>
        </div>
        <div className="flex flex-col px-4 ">
          <span>
            <span className="text-5xl">{displayTemperature(temp)}</span>
          </span>
          <p className="text-xs space-x-1 pt-1 whitespace-nowrap">
            <span>Feels Like</span>
            <span>{displayTemperature(feels_like)}</span>
          </p>
          <p className="text-xs space-x-2">
            <span>{displayTemperature(temp_min)}↓ </span>
            <span>{displayTemperature(temp_max)}↑ </span>
          </p>
          <p className="font-semibold">{description}</p>
        </div>
      </section>
      <section className="overflow-x-auto flex no-scrollbar justify-between gap-4 p-4 w-full ">
        <WeatherDetails {...props} />
      </section>
    </div>
  );
};

export default FiveDaysWeather;
