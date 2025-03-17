"use client";

import React, { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { testnetItems } from "../data"; // Impor data item
import Installation from "../../../components/Installation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Definisikan tipe untuk InstallationStep (sama dengan di Installation.tsx)
interface InstallationStep {
  language: string;
  title: string;
  code: string;
  rounded: "lg" | "xl" | "3xl";
}

// Definisikan tipe untuk TestnetItem
interface TestnetItem {
  name: string;
  logo: string;
  chainId: string;
  description: string;
  installationSteps: InstallationStep[];
}

interface TestnetPageProps {
  params: { item: string };
}

const TestnetPage: React.FC<TestnetPageProps> = ({ params }) => {
  const [showInstallation, setShowInstallation] = useState(false);

  const handleToggleInstallation = () => {
    console.log("Before toggle:", showInstallation);
    setShowInstallation((prev) => {
      const newState = !prev;
      console.log("After toggle:", newState);
      return newState;
    });
  };

  // Ambil data berdasarkan parameter URL
  const itemData = testnetItems[params.item as keyof typeof testnetItems] as TestnetItem | undefined;

  // Jika item tidak ditemukan, tampilkan 404
  if (!itemData) {
    notFound();
  }

  // Validasi dan transformasi data installationSteps
  const validRoundedValues = ["lg", "xl", "3xl"] as const;
  const transformedSteps: InstallationStep[] = itemData.installationSteps.map(step => ({
    ...step,
    rounded: validRoundedValues.includes(step.rounded as any) ? step.rounded : "lg", // Default ke "lg" jika tidak valid
  }));

  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto p-6 rounded-3xl">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#0f172a] p-5 rounded-xl border border-[#0056b3] shadow-lg">
          <div className="flex items-center gap-3">
            <Image 
              src={itemData.logo} 
              alt={`${itemData.name} Logo`} 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold text-white">{itemData.name} - Testnet</h1>
          </div>
          <div className="text-sm text-white">
            <span className="mr-2">Chain ID: {itemData.chainId}</span>
            <span className="text-green-400 inline-flex items-center">
              Online <span className="animate-pulse w-[0.7rem] h-[0.7rem] bg-[#10b981] rounded-full ml-1"></span>
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
                  src={itemData.logo} 
                  alt={`${itemData.name} Logo`} 
                  width={64} 
                  height={64} 
                  className="rounded-full shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-3 text-white">{itemData.name}</h2>
                <p className="text-gray-300 mt-3 max-w-xl">{itemData.description}</p>
              </div>
            ) : (
              <Installation steps={transformedSteps} /> // Gunakan data yang sudah divalidasi
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

export default TestnetPage;