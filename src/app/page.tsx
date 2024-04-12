import WeatherTable from "@/components/tabel";
import HeroWeather from "../components/HeroWeather";

const page = () => {
  return (
    <div className="bg-blue-300">
      <div>
        <HeroWeather />
      </div>
      <div className="px-10 py-10">
        <WeatherTable />
      </div>
    </div>
  );
};

export default page;
