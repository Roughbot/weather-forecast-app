import day from "../../../../public/assets/cloudy-day.png";
import night from "../../../../public/assets/cloudy-night.png";
import Image from "next/image";
import WeatherCard from "@/components/WeatherCard";

const Page = ({ params }: { params: any }) => {
  const { slug } = params;
  const cityName = decodeURIComponent(slug);

  return (
    <div className="gradient_background">
      <div className="top_screen">
        <h2 className="text-5xl font-bold text-yellow-400 text-center pt-6">
          {cityName}
        </h2>
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
