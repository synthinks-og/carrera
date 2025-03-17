"use client";

import React from "react";
import CodeBox from "./CodeBox";

interface InstallationStep {
  language: string;
  title: string;
  code: string;
  rounded: "lg" | "xl" | "3xl";
}

interface InstallationProps {
  steps: InstallationStep[];
}

const Installation: React.FC<InstallationProps> = ({ steps }) => {
  return (
    <div className="text-white">
      <h2 className="font-bold mb-6 text-xl">Installation</h2>
      {steps.map((step, index) => (
        <CodeBox
          key={index}
          language={step.language}
          title={step.title}
          code={step.code}
          rounded={step.rounded}
        />
      ))}
    </div>
  );
};

export default Installation;