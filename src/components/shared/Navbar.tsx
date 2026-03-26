"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <span className="text-blue-400">OS</span>
          <span className="hidden sm:inline text-zinc-200">Museum</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/museum"
            className={clsx(
              "text-sm transition-colors",
              pathname?.startsWith("/museum")
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Museum
          </Link>
          <Link
            href="/onboarding"
            className="text-sm px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium"
          >
            Start Contributing
          </Link>
        </div>
      </div>
    </nav>
  );
}
