import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EventHub | Premium Event & Stall Booking",
  description:
    "Find exhibitions, flea markets, and trade shows. Book stalls with interactive digital floor plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-blue-100 selection:text-blue-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}