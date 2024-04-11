const page = ({ params }: any) => {
  const { slug } = params;
  return (
    <div className="h-screen">
      <p className="text-center text-black font-bold text-3xl pt-10">
        Weather Forecast: <span className="text-red-400">{slug}</span>
      </p>
    </div>
  );
};

export default page;
