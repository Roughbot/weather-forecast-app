"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropDown from "./DropDown";

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
  const favoriteCities: any = [
    { id: 1, name: "London" },
    { id: 2, name: "New York" },
    { id: 3, name: "Paris" },
    { id: 4, name: "Tokyo" },
    { id: 5, name: "Sydney" },
    { id: 6, name: "Dubai" },
    { id: 7, name: "Singapore" },
    { id: 8, name: "Istanbul" },
    { id: 9, name: "Kuala Lumpur" },
    { id: 10, name: "Seoul" },
  ];

  return (
    <nav className="bg-blue-950 sticky z-10">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
          </Link>
        </div>
        <div className="text-white relative flex flex-row gap-3 sm:pr-10">
          <button onClick={toggleDropdownRec} className="">
            Recently Visited
          </button>
          {isOpenRec && (
            <DropDown favoriteCities={favoriteCities} name={"Recent"} />
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
