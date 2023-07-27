import { AuthProvider } from "@/contexts/AuthProviders";
import { Header } from "@/features/Layout/components/Header";
import { Toaster } from "@/features/ui/toaster";
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
        <AuthProvider>
          <main className="min-h-screen p-8 bg-white dark:bg-[#09090b]">
            <Header />
            <main className="flex flex-col items-center justify-center h-[70vh]">
              {children}
            </main>
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
