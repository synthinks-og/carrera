"use client";

import React, { useState } from "react";
import Image from "next/image";
import Installation from "./Installation"; // Mengimpor komponen Installation
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const nubit: React.FC = () => {
  const [showInstallation, setShowInstallation] = useState(false);

  const handleToggleInstallation = () => {
    console.log("Before toggle:", showInstallation);
    setShowInstallation((prev) => {
      const newState = !prev;
      console.log("After toggle:", newState);
      return newState;
    });
  };
  
  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto p-6 rounded-3xl">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0f172a] p-5 rounded-xl border border-[#0056b3] shadow-lg">
          <div className="flex items-center gap-3">
            <Image 
              src="/logos/nubit.jpg" 
              alt="nubit Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold text-white">Nubit - Testnet</h1>
          </div>
          <div className="text-sm text-white">
            <span className="mr-2">Chain ID: nubit</span>
            <span className="text-green-400 inline-flex items-center">
              Online <span className="animate-pulse 15s infinte w-[0.7rem] h-[0.7rem] bg-[#10b981] rounded-full ml-1 border-radius-50%"></span>
            </span>
          </div>
        </div>


        <div className="flex flex-col md:flex-row mt-4 gap-4">
          {/* Sidebar */}
          <div className="bg-[#0f172a] p-5 rounded-xl w-full md:w-1/4 shadow-lg border border-[#0056b3] flex-shrink-0 min-h-fit max-h-fit">
          <button 
              onClick={handleToggleInstallation}
              className={`w-full text-left p-3 rounded-xl transition duration-300 text-white shadow-md border border-[#0056b3] flex items-center ${
                showInstallation ? 'bg-[#005bb5]' : 'bg-[#0f172a] hover:bg-[#005bb5]'
              }`}
            >
              <FontAwesomeIcon 
                icon={showInstallation ? faChevronDown : faChevronRight} 
                className="mr-2" 
              />
              Installation
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-[#0f172a] p-7 rounded-2xl shadow-lg border border-[#0056b3] flex-1 max-w-full overflow-x-hidden">
            {!showInstallation ? (
              <div className="flex flex-col items-center text-center">
                <Image 
                  src="/logos/nubit.jpg" 
                  alt="nubit Logo" 
                  width={64} 
                  height={64} 
                  className="rounded-full shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-3 text-white">Nubit</h2>
                <p className="text-gray-300 mt-3 max-w-xl">
                Nubit is a scalable, cost-efficient, data availability layer secured by Bitcoin for the Bitcoin community. Nubit enables the scaling of Bitcoin's data capacities, empowering applications like Ordinals, Layer 2s, and price oracles.                </p>
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

export default nubit;
