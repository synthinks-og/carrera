"use client";

import React from "react";
import HiSychonix from "@/components/HiSychonix";
import WhatYouNeed from "@/components/WhatYouNeed";
import NetworkSection from "@/components/NetworkSection";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HiSychonix />
      <WhatYouNeed />
      <NetworkSection />
    </div>
  );
};

export default Home;