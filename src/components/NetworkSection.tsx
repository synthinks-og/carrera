import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { networks } from "./networks";
import { airdrops } from "./airdrops";

interface Network {
  name: string;
  logo: string;
  explorer: string;
  service: string;
}

const NetworkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Airdrop" | "Node">("Node");

  const renderItem = (item: Network, Airdrop, index: number) => (
    <div
      key={index}
      className="bg-[rgba(0,40,63,0.3)] p-6 rounded-3xl text-center border border-[#0070f3] transition-transform transform hover:-translate-y-2 hover:shadow-md hover:bg-[rgba(0,90,200,0.3)]"
    >
      <div className="flex items-center space-x-2 justify-center">
        <Image
          src={`/logos/${item.logo}`}
          alt={item.name}
          width={50}
          height={50}
          className="rounded-full"
          priority
        />
        <h2 className="text-lg font-bold">{item.name}</h2>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <Link
          href={item.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0070f3] px-4 py-1 text-sm rounded-lg hover:bg-[#005bb5] transition text-white"
        >
          Explorer
        </Link>
        <Link
          href={item.service}
          className="bg-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-600 transition text-gray-300"
        >
          Service
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mb-64 px-4 text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-5xl md:text-6xl font-bold text-left" id="network">
          Networks
        </h1>
        {/* Container untuk tombol dengan border biru */}
        <div className="flex rounded-3xl border-2 border-[#0070f3] overflow-hidden">
          <button
            className={`px-4 py-2 text-white transition-all duration-300 transform ${
              activeTab === "Node"
                ? "bg-[rgba(0,40,63,0.3)]" // Background aktif (sama seperti item)
                : "bg-[rgba(0, 20, 40, 0.35)]" // Background tidak aktif (sedikit lebih gelap)
            } `}
            onClick={() => setActiveTab("Node")}
          >
            Node
          </button>
          <button
            className={`px-4 py-2 text-white transition-all duration-300 transform ${
              activeTab === "Airdrop"
                ? "bg-[rgba(0,40,63,0.3)]" // Background aktif (sama seperti item)
                : "bg-[rgba(0, 20, 40, 0.35)]" // Background tidak aktif (sedikit lebih gelap)
            } `}
            onClick={() => setActiveTab("Airdrop")}
          >
            Airdrop
          </button>
        </div>
      </div>

      {activeTab === "Node" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {networks.map((network, index) => renderItem(network, index))}
        </div>
      )}

      {activeTab === "Airdrop" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {airdrops.map((airdrop, index) => renderItem(airdrop, index))}
        </div>
      )}
    </div>
  );
};

export default NetworkSection;