import WeatherTable from "@/components/tabel";
import HeroWeather from "../components/HeroWeather";

const page = () => {
  return (
    <div>
      <div>
        <HeroWeather />
      </div>
      <div className="px-10 py-10 max-h-screen">
        <WeatherTable />
      </div>
    </div>
  );
};

export default page;
