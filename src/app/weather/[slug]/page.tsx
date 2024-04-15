import day from "../../../../public/assets/cloudy-day.png";
import night from "../../../../public/assets/cloudy-night.png";
import Image from "next/image";
import WeatherCard from "@/components/WeatherCard";
import FavButton from "@/components/FavButton";

const Page = ({ params }: { params: any }) => {
  const { slug } = params;
  const cityName = decodeURIComponent(slug);

  return (
    <div className="gradient_background relative">
      <div className="top_screen">
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-5xl font-bold text-black sm:text-yellow-400 pt-6">
            {cityName}
          </h2>
          <div>
            <FavButton cityName={cityName} />
          </div>
        </div>

        <div className="p-4">
          <WeatherCard cityName={cityName} />
        </div>
      </div>
      <Image
        src={day}
        alt="day"
        priority={true}
        height={300}
        className="bg_image1"
      />
      <Image
        src={night}
        alt="day"
        priority={true}
        height={300}
        className="bg_image2"
      />
    </div>
  );
};

export default Page;
