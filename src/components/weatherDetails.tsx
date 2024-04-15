import "@fortawesome/fontawesome-free/css/all.min.css";
export interface weatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function weatherDetails(props: weatherDetailsProps) {
  return (
    <>
      <SingleWeatherDetails
        information="Visibility"
        icon={<i className="fas fa-eye"></i>}
        value={props.visibility}
      />
      <SingleWeatherDetails
        information="Humidity"
        icon={<i className="fas fa-tint"></i>}
        value={props.humidity}
      />
      <SingleWeatherDetails
        information="Wind Speed"
        icon={<i className="fa-solid fa-wind"></i>}
        value={props.windSpeed}
      />
      <SingleWeatherDetails
        information="Air Pressure"
        icon={<i className="fas fa-tachometer-alt"></i>}
        value={props.airPressure}
      />
      <SingleWeatherDetails
        information="Sunrise"
        icon={<i className="fas fa-sun"></i>}
        value={props.sunrise}
      />
      <SingleWeatherDetails
        information="Sunset"
        icon={<i className="fas fa-moon"></i>}
        value={props.sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailsProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
  return (
    <div className="flex text-white flex-col justify-between gap-1 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap text-sm">{props.information}</p>
      <div className="text-4xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
