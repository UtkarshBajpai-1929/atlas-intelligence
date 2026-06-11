import Link from "next/link";
import { Menu, Search } from "lucide-react";

export function ProductNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ebebeb] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/products" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff385c] text-[13px] font-bold text-white">
            A
          </span>
          <span className="text-[15px] font-semibold text-[#222222]">Atlas Intelligence</span>
        </Link>
      </div>
    </header>
  );
}

export function ProductFooter() {
  const columns = [
    {
      title: "Discover",
      links: ["Products", "Compare", "Trending", "New launches"],
    },
    {
      title: "Categories",
      links: ["AI Coding", "AI Agents", "AI Search", "Generative AI"],
    },
    {
      title: "Atlas",
      links: ["About", "Research", "Privacy", "Terms"],
    },
  ];

  return (
    <footer className="mt-8 border-t border-[#ebebeb] bg-[#f7f7f7]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-[1.7fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/products" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff385c] text-[15px] font-bold text-white">
              A
            </span>
            <span className="font-serif text-[22px] font-semibold text-[#222222]">
              Atlas Intelligence
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[14px] leading-7 text-[#717171]">
            The modern intelligence layer for the AI economy. Discover,
            evaluate and compare the products shaping the next decade.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#222222]">
              {column.title}
            </h3>
            <ul className="mt-5 space-y-4">
              {column.links.map((link) => (
                <li key={link}>
                  <Link
                    href={link === "Compare" ? "/compare/cursor-ai-vs-claude" : "#"}
                    className="text-[14px] text-[#717171] hover:text-[#222222]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-[#dddddd] px-6 py-7 text-[12px] text-[#717171] md:flex-row md:items-center md:justify-between lg:px-8">
        <span>© 2026 Atlas Intelligence. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
