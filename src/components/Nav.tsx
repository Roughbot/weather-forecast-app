import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-blue-950 sticky z-10">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
          </Link>
        </div>
        <div className="text-white sm:pr-10">
          <Link href="/favourite" style={{ margin: "0 10px" }}>
            Favourite
          </Link>
          <Link href="/recently-visited" style={{ margin: "0 10px" }}>
            Recently Visited
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
