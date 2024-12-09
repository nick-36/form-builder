import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex gap-2 items-center font-bold text-3xl bg-gradient-to-r from-indigo-400 to-yellow-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      <span className="bg-[url(/hammer.svg)] bg-no-repeat w-6 h-6"></span>
      <p className="text-xl font-semibold">Form builder</p>
    </Link>
  );
};

export default Logo;
