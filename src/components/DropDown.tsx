const DropDown = (favoriteCities: any, name: string) => {
  const data = favoriteCities.favoriteCities;

  return (
    <div className="origin-top-right absolute right-30 mt-10 w-48 rounded-md h-48 overflow-y-scroll no-scrollbar shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="px-4 py-2 font-bold text-gray-700">{name}</div>
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
                {city.name}
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
