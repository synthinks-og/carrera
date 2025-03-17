import React from "react";
import Link from "next/link";
import { FaEnvelope, FaTelegramPlane, FaTwitter, FaGithub } from "react-icons/fa"; // Import icons from react-icons

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-32 border-t border-gray-700"> {/* Hapus bg-[rgba(0,40,63,0.5)], tambahkan border-t */}
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
        {/* Ikon Sosial Media */}
        <div className="flex space-x-6">
          <Link href="mailto:rizze.fahri@gmail.com" aria-label="Email">
            <FaEnvelope className="w-6 h-6 text-gray-300 hover:text-[#0070f3] transition" />
          </Link>
          <Link href="https://t.me/synthinks" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegramPlane className="w-6 h-6 text-gray-300 hover:text-[#0070f3] transition" />
          </Link>
          <Link href="https://x.com/synthinks" target="_blank" rel="noopener noreferrer" aria-label="X">
            <FaTwitter className="w-6 h-6 text-gray-300 hover:text-[#0070f3] transition" />
          </Link>
          <Link href="https://github.com/synthinks-og" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="w-6 h-6 text-gray-300 hover:text-[#0070f3] transition" />
          </Link>
        </div>
        {/* Teks Hak Cipta */}
        <p className="text-gray-400 text-sm">
          Carrera. Committed to Secure Networks.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
