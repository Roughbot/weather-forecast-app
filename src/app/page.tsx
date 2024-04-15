import WeatherTable from "@/components/tabel";
import HeroWeather from "../components/HeroWeather";

const page = () => {
  return (
    <div className="dark_background">
      <div className="p-4">
        <HeroWeather />
      </div>

      <div className="p-5">
        <h3 className="text-3xl font-bold pt-3 pl-4">Search City</h3>
      </div>
      <div className="px-10 py-10">
        <WeatherTable />
      </div>
    </div>
  );
};

export default page;
