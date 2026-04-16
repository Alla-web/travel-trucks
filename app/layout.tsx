import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "modern-normalize/modern-normalize.css";

import "./globals.css";

import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";

export const metadata: Metadata = {
  title: "TravelTruck app",
  description: "Website for a company that rents campers",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="app">
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
        </TanStackProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#000",
              borderRadius: "12px",
            },
            success: {
              style: {
                background: "#fff",
                color: "#000",
              },
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
            },
            error: {
              style: {
                background: "#fff",
                color: "#000",
              },
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
