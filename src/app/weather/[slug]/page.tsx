export default function Page({ slug }: { slug: string }) {
  return (
    <div className="h-screen">
      <p className="text-center text-black font-bold text-3xl pt-10">
        Weather Forecast: <span className="text-red-400">{slug}</span>
      </p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  return {
    props: {
      slug: params.slug,
    },
  };
}
