"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // ajuste o caminho conforme sua estrutura

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-defaultGreen py-3 border-t shadow-sm z-50">
      <div className="flex justify-center items-center">
        <Link
          href="https://www.linkedin.com/in/jonasoliveira-desenvolvedor/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-defaultSnow hover:text-blue-500 transition-colors"
        >
          Created by: @JonasOliveira Developer
        </Link>
      </div>
    </footer>
  );
}