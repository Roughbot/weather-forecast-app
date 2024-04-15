"use client";
import { useState } from "react";

const FavButton = (cityName: any) => {
  const [addFav, setAddFav] = useState(false);

  const toggleFav = () => {
    setAddFav(!addFav);
  };

  return (
    <div>
      <button onClick={toggleFav}>
        {addFav ? (
          <p className="text-2xl text-yellow-400">
            <i className="fa-solid fa-star"></i>
          </p>
        ) : (
          <p className="text-2xl">
            <i className="fa-regular fa-star"></i>
          </p>
        )}
      </button>
    </div>
  );
};

export default FavButton;
