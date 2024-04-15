import { format, fromUnixTime, parseISO } from "date-fns";
import Image from "next/image";
import { metersToKilometers } from "@/app/utils/metersToKilometers";
import WeatherDetails from "@/components/weatherDetails";
import { convertWindSpeend } from "@/app/utils/windSpeedConvert";

export default function FirstDataContainer({ weatherData }: any) {
  const firstData = weatherData?.list[0];

  return (
    <section className="text-white">
      <div className="space-y-2 ">
        <h2 className="flex gap-1 text-2xl items-center">
          <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
          <p className="text-lg">
            ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
          </p>
        </h2>
        <div className="w-full bg-white border glass_morphism rounded-xl flex flex-col sm:flex-row py-4 shadow-sm gap-10 px-6 items-center">
          <div className="flex flex-col px-4">
            <span>
              <span className="text-5xl">
                {Math.floor(firstData?.main.temp)}°
              </span>
              <span className="text-2xl">C</span>
            </span>
            <p className="text-xs space-x-1 pt-1 whitespace-nowrap">
              <span>Feels Like</span>
              <span>{Math.floor(firstData?.main.feels_like)}°C</span>
            </p>
            <p className="text-xs space-x-2">
              <span>{Math.floor(firstData?.main.temp_min)}°↓ </span>
              <span>{Math.floor(firstData?.main.temp_max)}°↑ </span>
            </p>
          </div>
          <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 no-scrollbar">
            {weatherData?.list.map((data: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-between text-xs gap-2 items-center text-center"
                >
                  <p className="whitespace-nowrap">
                    {format(parseISO(data.dt_txt), "HH:mm a")}
                  </p>
                  <div className="relative h-20 w-20">
                    <Image
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                      alt="weather icon"
                      width={100}
                      height={100}
                      className="absolute w-full h-full"
                    />
                  </div>
                  <p className="whitespace-nowrap">
                    {data.weather[0].description}
                  </p>
                  <p>{Math.floor(data.main.temp)}°C</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <div className="w-fit justify-center flex-col px-4 items-center bg-white border glass_morphism rounded-xl flex py-4 shadow-sm">
          <Image
            src={`http://openweathermap.org/img/wn/${firstData.weather[0].icon}@4x.png`}
            alt="weather icon"
            width={100}
            height={100}
            className="w-full h-full"
          />
          <p className="whitespace-nowrap">
            {firstData.weather[0].description}
          </p>
        </div>

        <div className="px-6 gap-4 justify-between overflow-x-auto w-full flex  no-scrollbar sm:flex-row glass_morphism rounded-lg shadow-sm py-4">
          <WeatherDetails
            visibility={metersToKilometers(firstData?.visibility)}
            airPressure={`${firstData?.main.pressure} hPa`}
            humidity={`${firstData?.main.humidity}%`}
            windSpeed={`${convertWindSpeend(firstData?.wind.speed)} m/s`}
            sunrise={format(fromUnixTime(weatherData?.city.sunrise), "hh:mm a")}
            sunset={format(fromUnixTime(weatherData?.city.sunset), "hh:mm a")}
          />
        </div>
      </div>
    </section>
  );
}
