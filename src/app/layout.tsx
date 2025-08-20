import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {Header} from "@/components/header"
import { AuthProvider } from "@/context/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Manager - Sistema de gerenciamento",
  description: "Gerencie seus pacientes de forma fácil e dinâmica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
            <Header />
            {children}
        </AuthProvider>
        
      </body>
    </html>
  );
}
