"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFav, removeFav } from "@/features/favSlice";
import { useSelector } from "react-redux";

const FavButton = (cityName: any) => {
  const [isFav, setIsFav] = useState(false);

  const name = cityName.cityName;
  const dispatch = useDispatch();

  const favs = useSelector((state: any) => state.fav.favs);

  useEffect(() => {
    const isFav = favs.some((fav: any) => fav.name === name);
    setIsFav(isFav);
  }, [favs, name]);

  const addFavCity = (e: any) => {
    e.preventDefault();

    if (isFav) {
      setIsFav(false);
      dispatch(removeFav({ name }));
      return;
    }

    dispatch(addFav({ name }));
    setIsFav(true);
  };

  return (
    <div>
      <button
        onClick={(e) => {
          addFavCity(e);
        }}
      >
        {isFav ? (
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
