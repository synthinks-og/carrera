// components/NetworkSection.tsx
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface Network {
  name: string;
  logo: string;
  explorer: string;
  service: string;
}

const NetworkSection: React.FC = () => {
  const networks: Network[] = useMemo(
    () => [
      { name: "Arichains", logo: "airchains.jpg", explorer: "#", service: "/testnet/arichains" },
      { name: "AtomOne", logo: "atomone.png", explorer: "#", service: "https://sychonix.com/testnet/airchains" },
      { name: "Avail", logo: "avail.png", explorer: "#", service: "/testnet/avail" },
      { name: "Crossfi", logo: "crossfi.jpg", explorer: "#", service: "/testnet/crossfi" },
      { name: "Axon", logo: "axone.jpg", explorer: "#", service: "/testnet/axon" },
      { name: "Dill", logo: "dill.jpg", explorer: "#", service: "/testnet/dill" },
      { name: "Initia", logo: "initia.jpg", explorer: "#", service: "/testnet/initia" },
      { name: "Fiamma", logo: "fiamma.jpg", explorer: "#", service: "/testnet/fiamma" },
      { name: "Kopi", logo: "kopi.jpg", explorer: "#", service: "/testnet/kopi" },
      { name: "Nubit", logo: "nubit.jpg", explorer: "#", service: "/testnet/nubit" },
      { name: "Symphony", logo: "sym.jpeg", explorer: "#", service: "/testnet/symphony" },
      { name: "T3rn", logo: "tern.png", explorer: "#", service: "/testnet/t3rn" },
      { name: "Union", logo: "union.png", explorer: "#", service: "/testnet/union" },
      { name: "Tanssi", logo: "tanssi.jpg", explorer: "#", service: "/testnet/tanssi" },
    ],
    []
  );

  return (
    <div className="text-center mb-48">
      <div>
        <h1 className="text-3xl font-bold mb-6" id="network">
          Networks
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {networks.map((network, index) => (
            <div
              key={index}
              className="bg-[rgba(0,40,63,0.3)] p-6 rounded-3xl text-center border border-[#0070f3] transition-transform transform hover:-translate-y-2 hover:shadow-md hover:bg-[rgba(0,90,200,0.3)]"
            >
              <div className="flex items-center space-x-2 justify-center">
                <Image
                  src={`/logos/${network.logo}`}
                  alt={network.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                  priority
                />
                <h2 className="text-lg font-bold">{network.name}</h2>
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <Link
                  href={network.explorer}
                  className="bg-[#0070f3] px-4 py-1 text-sm rounded-lg hover:bg-[#005bb5] transition text-white"
                >
                  Explorer
                </Link>
                <Link
                  href={network.service}
                  className="bg-gray-700 px-4 py-1 text-sm rounded-lg hover:bg-gray-600 transition text-gray-300"
                >
                  Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkSection;
