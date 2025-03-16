"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HiSychonix from "../components/HiSychonix";
import WhatYouNeed from "../components/WhatYouNeed";
import NetworkSection from "../components/NetworkSection";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="bg-[#0a0e1a] text-white p-6 flex flex-col items-center pt-16">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm py-4 px-6 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
          </div>
          <div className="flex space-x-6">
            <Link href="#network" className="hover:text-[#0070f3] transition">
              Network
            </Link>
            <Link href="#service" className="hover:text-[#0070f3] transition">
              Service
            </Link>
            <Link href="#explorer" className="hover:text-[#0070f3] transition">
              Explorer
            </Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-6xl mt-24 pt-16"> {/* Tambah mt-24 dan pt-16 */}
        <HiSychonix />
        <WhatYouNeed />
        <NetworkSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
