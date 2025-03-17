"use client";

import React from "react";
import CodeBox from "./CodeBox";

const Installation: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="font-bold mb-6 text-xl"> </h2>
      <CodeBox
        language="bash"
        title=""
        code={`Under maintenance :(`}
        rounded="lg"
      />
    </div>
  );
};

export default Installation;
