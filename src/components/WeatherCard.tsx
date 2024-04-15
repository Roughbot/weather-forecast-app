"use client";
import { useEffect, useState } from "react";
import FirstDataContainer from "./container";
import FiveDaysWeather from "@/components/fiveDaysWeather";
import { format, fromUnixTime, parseISO } from "date-fns";
import { convertWindSpeend } from "@/app/utils/windSpeedConvert";
import Loading from "./loading/loading";
import { metersToKilometers } from "@/app/utils/metersToKilometers";

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

  const uniqueDates = [
    ...new Set(
      weatherData?.list.map(
        (weatherEntry) =>
          new Date(weatherEntry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDay = uniqueDates.map((date) => {
    return weatherData?.list.find((weatherEntry) => {
      const entryDate = new Date(weatherEntry.dt * 1000)
        .toISOString()
        .split("T")[0];
      const entryTime = new Date(weatherEntry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

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
      <div className="flex items-center justify-center p-10 w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="glass_morphism p-6">
        <FirstDataContainer weatherData={weatherData} />
      </div>
      <div className="pt-10 mt-4">
        <h2 className="text-4xl font-semibold text-yellow-300">
          Next 5 days weather forecast for {weatherData?.city.name}{" "}
        </h2>
      </div>
      <div className="overflow-y-auto space-y-6 mt-10">
        {firstDataForEachDay.slice(0, 5).map((data, index: number) => {
          return (
            <FiveDaysWeather
              key={index}
              description={data?.weather[0].description ?? ""}
              weatherIcon={data?.weather[0].icon ?? ""}
              date={format(parseISO(data?.dt_txt ?? ""), "dd.MM.yyyy")}
              day={format(parseISO(data?.dt_txt ?? ""), "EEEE")}
              temp={Math.round(data?.main.temp ?? 0)}
              feels_like={Math.round(data?.main.feels_like ?? 0)}
              temp_max={Math.round(data?.main.temp_max ?? 0)}
              temp_min={Math.round(data?.main.temp_min ?? 0)}
              airPressure={`${data?.main.pressure} hPa` ?? ""}
              humidity={`${data?.main.humidity}%` ?? ""}
              sunrise={format(
                fromUnixTime(weatherData?.city.sunrise ?? 1702517657),
                "HH:mm"
              )}
              sunset={format(
                fromUnixTime(weatherData?.city.sunset ?? 1702517657),
                "HH:mm"
              )}
              visibility={metersToKilometers(data?.visibility || 0) ?? ""}
              windSpeed={
                `${convertWindSpeend(data?.wind.speed ?? 1.64)} m/s` ?? ""
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeatherCard;
