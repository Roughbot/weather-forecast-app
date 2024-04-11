const Page = ({ slug }: { slug: string }) => {
  return (
    <div className="h-screen">
      <p className="text-center text-black font-bold text-3xl pt-10">
        Weather Forecast: <span className="text-red-400">{slug}</span>
      </p>
    </div>
  );
};

export default Page;

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  return {
    props: {
      slug,
    },
  };
}
