import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synthinks",
  description: "Committed to Secure Networks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body
        className={`${inter.className} bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: "url('/bg-main1.jpg')", backgroundColor: "transparent" }}
        suppressHydrationWarning
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutClient>{children}</LayoutClient>
        </Suspense>
      </body>
    </html>
  );
}

