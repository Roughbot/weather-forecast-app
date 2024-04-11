"use client";
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

// export default function Page({ params }: any) {
//   return (
//     <div className="h-screen">
//       <p className="text-center text-black font-bold text-3xl pt-10">
//         Weather Forecast: <span className="text-red-400">{params.slug}</span>
//       </p>
//     </div>
//   );
// }
