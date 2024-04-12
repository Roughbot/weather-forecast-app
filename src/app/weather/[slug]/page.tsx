import Head from "next/head";
import day from "../../../../public/assets/cloudy-day.png";
import night from "../../../../public/assets/cloudy-night.png";
import Image from "next/image";

const Page = ({ params }: { params: any }) => {
  const { slug } = params;
  return (
    <div className="gradient_background">
      <Head>
        <title>Weather | {slug}</title>
      </Head>
      <p className="text-center text-black font-bold text-3xl pt-10">
        Weather Forecast: <span className="text-red-400">{slug}</span>
      </p>
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
