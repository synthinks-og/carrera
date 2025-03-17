import React from "react";
import { FaRocket, FaBookOpen, FaLink, FaLightbulb } from "react-icons/fa";

interface AboutSection {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhatYouNeed: React.FC = () => {
  const aboutSections: AboutSection[] = [
    {
      icon: <FaRocket className="text-white" />,
      title: "Highly Secured",
      description: "Carrera is highly secured with 24/7 monitoring, ensuring the integrity and safety of transactions and stakeholder assets.",
    },
    {
      icon: <FaBookOpen className="text-white" />,
      title: "Service Guide",
      description: "We provide comprehensive setup documents and guides for our community, empowering users to navigate and utilize our platform effectively.",
    },
    {
      icon: <FaLink className="text-white" />,
      title: "Interchain-Explorer",
      description: "Our fast and reliable Interchain Explorer facilitates seamless navigation and interaction between blockchain networks, enhancing accessibility and user experience.",
    },
    {
      icon: <FaLightbulb className="text-white" />,
      title: "Fully Comply",
      description: "We fully comply with blockchain governance protocols, actively participating in chain governance, updates, and upgrades to ensure network stability and innovation.",
    },
  ];

  return (
    <div className="py-16 px-4 mb-64">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-white" id="service">
        What you need to know about Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border-2 border-[#0070f3]/50 hover:-translate-y-2 hover:shadow-lg hover:border-[#0070f3] transition-transform duration-300 flex flex-col items-start text-left"
          >
            <div className="flex flex-col space-y-4 mb-4">
              <div className="flex items-center justify-center bg-blue-700 h-12 w-12 rounded-md">
                {section.icon}
              </div>
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
            </div>
            <p className="text-gray-300 text-sm">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouNeed;
