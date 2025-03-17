import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBoxProps {
  language: string;
  title: string;
  code: string;
  rounded: "lg" | "xl" | "3xl";
}

const CodeBox: React.FC<CodeBoxProps> = ({ language, title, code, rounded }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      console.log("Text copied successfully!");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="mb-6 w-full max-w-full">
      <p className="mb-2 text-gray-300">{title}</p>
      <div className={`relative bg-[rgb(22,24,28)] rounded-${rounded} w-full max-w-full overflow-x-auto`}>
        <span className="absolute top-1.5 left-2 text-[10px] text-[#94a3b8] bg-[rgb(32,35,39)] px-1.5 py-0.5 rounded">
          {language}
        </span>
        <div className="w-full">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: "12px",
              paddingTop: "6px",
              borderRadius: `0 0 ${
                rounded === "lg" ? "0.5rem" : rounded === "xl" ? "0.75rem" : "1rem"
              } ${
                rounded === "lg" ? "0.5rem" : rounded === "xl" ? "0.75rem" : "1rem"
              }`,
              fontSize: "0.875rem",
              lineHeight: "1.4",
              background: "rgb(32, 35, 39)",
              maxWidth: "100%", // Pastikan tidak melebihi 100%
              width: "100%", // Ikuti lebar parent
              whiteSpace: "pre-wrap", // Izinkan pembungkusan teks jika perlu
              overflowX: "auto", // Aktifkan scroll horizontal
              boxSizing: "border-box",
            }}
            wrapLines={true}
            showLineNumbers={false}
            className="w-full max-w-full overflow-x-auto pt-7 pb-3 bg-[rgb(32, 35, 39)] text-white p-4 rounded-b-lg"
          >
            {code}
          </SyntaxHighlighter>
          <button
            onClick={copyToClipboard}
            onMouseEnter={() => console.log("Hover detected on button")}
            className="group absolute top-[3px] right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 hover:bg-blue-500/20"
          >
            <FontAwesomeIcon
              icon={faCopy}
              className="text-white text-xs group-hover:text-[#007BFF] transition-colors duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeBox;