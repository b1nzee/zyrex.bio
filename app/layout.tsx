import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/brand";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: brand.name,
  description: brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)]" />

        <Navbar />
        {children}
      </body>
    </html>
  );
}
