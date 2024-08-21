import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import Background from "@/assets/images/bg-vector.svg";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOVIE APP",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NextUIProvider>
        <ToastContainer />
          {children}
          <Image alt="background" src={Background} height={200} width={1800} className="w-full absolute bottom-0 pointer-events-none" />
        </NextUIProvider>
      </body>
    </html>
  );
}