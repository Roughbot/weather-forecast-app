"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";

const Nav = () => {
  const [isOpenFav, setIsOpenFav] = useState(false);
  const [isOpenRec, setIsOpenRec] = useState(false);

  const toggleDropdownFav = () => {
    setIsOpenFav(!isOpenFav);
    if (isOpenRec) {
      setIsOpenRec(false);
    }
  };

  const toggleDropdownRec = () => {
    setIsOpenRec(!isOpenRec);
    if (isOpenFav) {
      setIsOpenFav(false);
    }
  };

  const favoriteCities = useSelector((state: any) => state.fav.favs);
  const recentCities = useSelector((state: any) => state.recent.recents);

  return (
    <nav className="bg-blue-950 relative z-50">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
          </Link>
        </div>
        <div className="text-white relative flex flex-row gap-3 pr-4 sm:pr-10">
          <button onClick={toggleDropdownRec} className="">
            Recently Visited
          </button>
          {isOpenRec && (
            <DropDown favoriteCities={recentCities} name={"Recent"} />
          )}
          <button onClick={toggleDropdownFav} className="">
            Favourite
          </button>
          {isOpenFav && (
            <DropDown favoriteCities={favoriteCities} name={"Favourite"} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
