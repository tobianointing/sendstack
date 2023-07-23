import { Header } from "@/features/Layout/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sendstack Delivery",
  description:
    "Sendstack helps businesses grow with ease by providing the most reliable, affordable and efficient delivery service.z",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="min-h-screen p-12  bg-white dark:bg-[#09090b]">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
