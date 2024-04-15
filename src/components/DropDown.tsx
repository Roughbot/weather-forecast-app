import Link from "next/link";

const DropDown = (favoriteCities: any) => {
  const data = favoriteCities.favoriteCities;
  const dropDownName = favoriteCities.name;
  return (
    <div className="origin-top-right right-30 z-50  absolute mt-10 w-48 rounded-md h-48 overflow-y-scroll no-scrollbar shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="px-4 py-2 font-bold bg-slate-500 sticky text-white">
        {dropDownName}
      </div>
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {data.length > 0 ? (
          <ul>
            {data.map((city: any) => (
              <li
                key={city.id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <Link href={`/weather/${city.name}`} target="_blank">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="block px-4 py-2 text-sm text-gray-700">
            No favorite cities added
          </p>
        )}
      </div>
    </div>
  );
};

export default DropDown;
