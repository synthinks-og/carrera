import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carrera",
  description: "Portfolio of blockchain validator nodes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ margin: 0, backgroundColor: "#121212", color: "white" }}
        suppressHydrationWarning // ✅ Tambahkan ini
      >
        {children}
      </body>
    </html>
  );
}

