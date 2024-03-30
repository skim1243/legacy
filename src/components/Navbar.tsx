import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#F8F9FA] px-6 py-3">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/minerva.svg" alt="Logo" width={50} height={50} />
        </Link>
      </div>
      <div className="hidden space-x-4 md:flex">
        <Link
          href="/"
          className="text-[#6C757D] transition duration-150 ease-in-out hover:text-[#111928]"
        >
          About
        </Link>
        <Link
          href="/"
          className="text-[#6C757D] transition duration-150 ease-in-out hover:text-[#111928]"
        >
          Account
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
