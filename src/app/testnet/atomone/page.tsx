"use client";

import React from "react";
import Image from "next/image";

const Arichains: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-200 antialiased py-12 px-4">
      <div className="max-w-5xl mx-auto p-6 rounded-3xl">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0f172a] p-5 rounded-3xl border border-[#0056b3] shadow-lg">
          <div className="flex items-center gap-3">
            <Image 
              src="/logos/atomone.png" 
              alt="AtomOne Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold">AtomOne - Testnet</h1>
          </div>
          <div className="text-sm">
            <span className="mr-2">Chain ID: atomone</span>
            <span className="text-green-400">● Online</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-4 gap-4">
          {/* Sidebar */}
          <div className="bg-[#0f172a] p-5 rounded-3xl w-full md:w-1/4 shadow-lg border border-[#0056b3]">
            <button className="w-full text-left bg-[#0f172a] p-3 rounded-2xl hover:bg-[#005bb5] transition duration-300 text-white shadow-md border border-[#0056b3]">
              ▶ Installation
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-[#0f172a] p-7 rounded-3xl flex-1 shadow-lg border border-[#0056b3]">
            <div className="flex flex-col items-center text-center">
              <Image 
                src="/logos/atomone.png" 
                alt="Atom Logo" 
                width={64} 
                height={64} 
                className="rounded-full shadow-lg"
              />
              <h2 className="text-2xl font-bold mt-3">AtomOne</h2>
              <p className="text-gray-300 mt-3 max-w-xl">
                AtomOne is a Web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust-minimized way.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-7">
              <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#0056b3] hover:bg-[#005bb5] transition duration-300 text-white shadow-md">
                <h3 className="font-semibold">Telemetry</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Monitor the network status and performance metrics of AtomOne in real-time.
                </p>
              </div>
              <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#0056b3] hover:bg-[#005bb5] transition duration-300 text-white shadow-md">
                <h3 className="font-semibold">Chain Explorer</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Explore blocks, transactions, and validator information for AtomOne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollbar Customization */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #0070f3;
          border-radius: 10px;
          border: 3px solid #005bb5;
        }
        ::-webkit-scrollbar-track {
          background: #002c4a;
        }
      `}</style>
    </div>
  );
};

export default Arichains;
