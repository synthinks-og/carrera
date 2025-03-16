// app/testnet/crossfi.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";

const CrossfiPage: React.FC = () => {
  return (
    <div className="bg-[#0a0e1a] text-white flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm py-4 px-6 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
          </div>
          <div className="flex space-x-6">
            <Link href="/#network" className="hover:text-[#0070f3] transition">
              Network
            </Link>
            <Link href="/#service" className="hover:text-[#0070f3] transition">
              Service
            </Link>
            <Link href="/#explorer" className="hover:text-[#0070f3] transition">
              Explorer
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 pt-24">
        {/* Sidebar */}
        <aside className="bg-[rgba(0,40,63,0.3)] text-white w-64 p-4 border-r border-[#0070f3]/50">
          <h2 className="text-lg font-semibold mb-4">Installation</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#0070f3] flex items-center space-x-2">
                <span>📄</span> <span>Docs</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#0070f3] flex items-center space-x-2">
                <span>💻</span> <span>GitHub</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#0070f3] flex items-center space-x-2">
                <span>🐦</span> <span>Twitter</span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-8">
          <div className="text-center mb-12">
            <Image
              src="/logos/crossfi.jpg"
              alt="Crossfi Logo"
              width={100}
              height={100}
              className="mx-auto mb-4 rounded-full"
              priority
            />
            <h1 className="text-3xl font-bold">Crossfi</h1>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mt-2">
              Crossfi enables seamless cross-chain transactions with high efficiency.
            </p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="text-sm text-gray-400">
                Chain ID: turing | Status: <span className="text-green-500">●</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Telemetry Card */}
            <div className="p-6 rounded-xl border-2 border-[#0070f3]/50 hover:-translate-y-2 hover:shadow-lg hover:border-[#0070f3] transition-transform duration-300 flex flex-col items-start text-left">
              <h2 className="text-xl font-semibold text-white mb-4">Telemetry</h2>
              <p className="text-gray-300 text-sm">
                Monitor the network status and performance metrics of Crossfi Network in real-time.
              </p>
            </div>

            {/* Chain Explorer Card */}
            <div className="p-6 rounded-xl border-2 border-[#0070f3]/50 hover:-translate-y-2 hover:shadow-lg hover:border-[#0070f3] transition-transform duration-300 flex flex-col items-start text-left">
              <h2 className="text-xl font-semibold text-white mb-4">Chain Explorer</h2>
              <p className="text-gray-300 text-sm">
                Explore blocks, transactions, and validator information for Crossfi Network.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CrossfiPage;
