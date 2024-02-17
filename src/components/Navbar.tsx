import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#F8F9FA]">
      <div className="flex items-center">
        <Image src="/minerva.svg" alt="Logo" width={50} height={50} />
      </div>
      <div className="hidden md:flex space-x-4">
        <Link href="/about" className="text-[#6C757D] hover:text-[#111928] transition duration-150 ease-in-out">About</Link>
        <Link href="/account" className="text-[#6C757D] hover:text-[#111928] transition duration-150 ease-in-out">Account</Link>
      </div>
    </nav>
  );
};

export default Navbar;
