"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "text-center mb-48" : "text-center mb-16"}>
      <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm py-4 px-6 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {/* Logo sebagai tombol Home */}
          <Link href="/" passHref>
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={42} 
              height={42} 
              className="object-contain cursor-pointer" 
              priority
            />
          </Link>

          {/* Navigasi */}
          <div className="flex space-x-6">
            <Link href="/#network" className="hover:text-[#0070f3] transition">
              Network
            </Link>
            <Link href="/#service" className="hover:text-[#0070f3] transition">
              Service
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

