"use client";

import React, { useState } from "react";
import Image from "next/image";
import Installation from "./Installation"; // Mengimpor komponen Installation
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const avail: React.FC = () => {
  const [showInstallation, setShowInstallation] = useState(false);

  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto p-6 rounded-3xl">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0f172a] p-5 rounded-xl border border-[#0056b3] shadow-lg">
          <div className="flex items-center gap-3">
            <Image 
              src="/logos/avail.png" 
              alt="avail Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold text-white">Avail - Testnet</h1>
          </div>
          <div className="text-sm text-white">
            <span className="mr-2">Chain ID: avail</span>
            <span className="text-green-400 inline-flex items-center">
              Online <span className="animate-pulse 15s infinte w-[0.7rem] h-[0.7rem] bg-[#10b981] rounded-full ml-1 border-radius-50%"></span>
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-4 gap-4">
          {/* Sidebar */}
          <div className="bg-[#0f172a] p-5 rounded-xl w-full md:w-1/4 shadow-lg border border-[#0056b3]">
            <button 
              onClick={() => setShowInstallation(!showInstallation)}
              className="w-full text-left bg-[#0f172a] p-3 rounded-xl hover:bg-[#005bb5] transition duration-300 text-white shadow-md border border-[#0056b3]"
            >
              ▶ Installation
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-[#0f172a] p-7 rounded-2xl shadow-lg border border-[#0056b3] max-w-[100%]">
            {!showInstallation ? (
              <div className="flex flex-col items-center text-center">
                <Image 
                  src="/logos/avail.png" 
                  alt="avail Logo" 
                  width={64} 
                  height={64} 
                  className="rounded-full shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-3 text-white">Avail</h2>
                <p className="text-gray-300 mt-3 max-w-xl">
                Avail is a Web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust-minimized way.
                </p>
                <div className="grid md:grid-cols-2 gap-5 mt-7">
                  <div className="bg-[#0f172a] p-5 rounded-xl border border-[#0056b3] hover:bg-[#005bb5] transition duration-300 text-white shadow-md">
                    <h3 className="font-semibold">Telemetry</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      Monitor the network status and performance metrics of Avail in real-time.
                    </p>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-xl border border-[#0056b3] hover:bg-[#005bb5] transition duration-300 text-white shadow-md">
                    <h3 className="font-semibold">Chain Explorer</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      Explore blocks, transactions, and validator information for Avail.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Installation />
            )}
          </div>
        </div>
      </div>

      {/* Scrollbar Customization and Pulse Animation */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
          height: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #6B7280;
          border-radius: 10px;
          border: 2px solid #0f172a;
        }
        ::-webkit-scrollbar-track {
          background: rgb(22,24,28);
        }
        .overflow-x-auto {
          max-width: 100%;
          overflow-x: auto;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default avail;
