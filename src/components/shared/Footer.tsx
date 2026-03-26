import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <span>Open Source Museum — MIT License</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/CamelCod/open-source-museum"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <Link href="/onboarding" className="hover:text-white transition-colors">
            Contributing Guide
          </Link>
          <a
            href="https://github.com/CamelCod/open-source-museum/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            License
          </a>
        </div>
      </div>
    </footer>
  );
}
