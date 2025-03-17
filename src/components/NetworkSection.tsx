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
      { name: "Airchains", logo: "airchains.jpg", explorer: "https://www.airchains.io/", service: "/testnet/airchains" },
      { name: "AtomOne", logo: "atomone.png", explorer: "https://atom.one/", service: "/testnet/atomone" },
      { name: "Avail", logo: "avail.png", explorer: "https://token.availproject.org/", service: "/testnet/avail" },
      { name: "Axone", logo: "axone.jpg", explorer: "https://www.axone.xyz/", service: "/testnet/axone" },
      { name: "Chainflip", logo: "chainflip.png", explorer: "  https://chainflip.io/", service: "/testnet/chainflip" },
      { name: "Crossfi", logo: "crossfi.jpg", explorer: "https://crossfi.org/", service: "/testnet/crossfi" },
      { name: "Chasm", logo: "chasm.png", explorer: "https://www.chasm.net//", service: "/testnet/chasm" },
      { name: "Dill", logo: "dill.jpg", explorer: "https://dill.xyz/", service: "/testnet/dill" },
      { name: "Fiamma", logo: "fiamma.jpg", explorer: "https://www.fiammalabs.io/", service: "/testnet/fiamma" },
      { name: "GaiaNet", logo: "gaianet.jpeg", explorer: "", service: "/testnet/gaianet" },
      { name: "Initia", logo: "initia.jpg", explorer: "https://initia.xyz/", service: "/testnet/initia" },
      { name: "Kopi", logo: "kopi.jpg", explorer: "https://kopi.money/", service: "/testnet/kopi" },
      { name: "Nubit", logo: "nubit.jpg", explorer: "https://www.nubit.org/", service: "/testnet/nubit" },
      { name: "0G Labs", logo: "0g.jpg", explorer: "", service: "/testnet/zeroglabs" },
      { name: "Symphony", logo: "sym.jpeg", explorer: "https://orchestralabs.org/", service: "/testnet/symphony" },
      { name: "Prysm", logo: "prysm.png", explorer: "", service: "/testnet/prysm" },
      { name: "Tanssi", logo: "tanssi.jpg", explorer: "https://www.tanssi.network/", service: "/testnet/tanssi" },
      { name: "T3rn", logo: "tern.png", explorer: "https://www.t3rn.io/", service: "/testnet/tern" },
      { name: "Union", logo: "union.png", explorer: "https://union.build/", service: "/testnet/union" },

    ],
    []
  );


  return (
    <div className="text-center mb-64">
      <div>
        <h1 className="text-4xl font-bold mb-12 text-center text-white" id="network">
          Networks
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto px-4">
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
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer" // Security
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

