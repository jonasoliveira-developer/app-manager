import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import { UserProvider } from "@/context/UserContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FisioAdmin",
  description: "Sistema de gestão para fisioterapia",
  themeColor: "#1B5E20",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js');
        });
      }
    `,
          }}
        />



        <AuthProvider>
          <UserProvider>
            <Toaster toastOptions={{ duration: 4000 }} position="top-right" />
            {children}
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}