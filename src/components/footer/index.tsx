"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white py-3">
      <div className="flex justify-center items-center">
        <Link
          href="https://www.linkedin.com/in/jonasoliveiradev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-500 transition-colors"
        >
          Created by: @JonasOliveira Developer
        </Link>
      </div>
    </footer>
  );
}