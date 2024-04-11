import Head from "next/head";

const Page = ({ params }: { params: any }) => {
  const { slug } = params;
  return (
    <div className="h-screen">
      <Head>
        <title>Weather | {slug}</title>
      </Head>
      <p className="text-center text-black font-bold text-3xl pt-10">
        Weather Forecast: <span className="text-red-400">{slug}</span>
      </p>
    </div>
  );
};

export default Page;
