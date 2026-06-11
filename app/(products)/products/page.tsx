import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, TrendingUp } from "lucide-react";
import { ProductGrid } from "@/features/products/components/product-grid";
import { ProductCard } from "@/features/products/components/product-card";
import { SearchBar } from "@/features/products/components/search-bar";
import {
  getAllCategories,
  getAllProducts,
  getTrendingProducts,
} from "@/features/products/lib/product.helper";

const filterTabs = [
  "All",
  "AI Coding",
  "AI Agents",
  "AI Search",
  "Generative AI",
  "Marketing AI",
  "Healthcare AI",
  "Robotics",
];

const sortingPills = ["Trending", "Popularity", "Launch Date", "Recently Added", "Pricing"];

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getAllCategories();
  const trendingProducts = getTrendingProducts().slice(0, 3);

  return (
    <div>
      <section className="border-b border-[#dddddd] bg-[#ffffff] px-6 pb-20 pt-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#dddddd] bg-white px-4 py-2 text-[12px] font-semibold text-[#717171] shadow-[0_10px_24px_rgba(43,35,28,0.035)]">
            <Sparkles size={14} className="text-[#ff385c]" />
            1,284 products · updated daily
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl font-serif text-[48px] font-semibold leading-[0.98] tracking-[-0.035em] text-[#222222] md:text-[72px]">
            Discover the world&apos;s
            <span className="block italic text-[#ff385c]">best AI products.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-[640px] text-[17px] leading-8 text-[#717171]">
            Atlas is the modern intelligence layer for the AI economy. Search,
            compare and follow the people and products shaping the next decade.
          </p>

          <SearchBar />

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px] text-[#777069]">
            <span className="mr-1">Trending:</span>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href="#catalog"
                className="rounded-full bg-white px-4 py-2 text-[#222222] shadow-[0_8px_18px_rgba(43,35,28,0.035)]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#dddddd] bg-white">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-6 lg:px-8">
          {filterTabs.map((tab, index) => (
            <button
              key={tab}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold ${
                index === 0
                  ? "border-[#151515] bg-[#151515] text-white"
                  : "border-[#dddddd] bg-white text-[#222222]"
              }`}
            >
              {index > 0 ? <span className="text-[#ff385c]">✦</span> : null}
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-9">
          <h2 className="font-serif text-[34px] font-semibold leading-tight tracking-[-0.02em] text-[#222222] md:text-[40px]">
            All AI products
          </h2>
          <p className="mt-2 text-[14px] text-[#717171]">
            Curated from {products.length}+ active products across every category.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {sortingPills.map((pill, index) => (
              <button
                key={pill}
                className={`flex h-9 items-center gap-1 rounded-full border px-4 text-[12px] font-semibold ${
                  index === 0
                    ? "border-[#151515] bg-[#151515] text-white"
                    : "border-[#dddddd] bg-white text-[#717171]"
                }`}
              >
                {pill}
                {index > 0 ? <ChevronDown size={13} /> : null}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={products.slice(0, 13)} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff385c]">
              <TrendingUp size={14} />
              Trending now
            </p>
            <h2 className="mt-7 font-serif text-[36px] font-semibold tracking-[-0.025em] text-[#222222]">
              Trending AI products
            </h2>
          </div>
          <Link href="#catalog" className="hidden items-center gap-2 text-[14px] font-semibold text-[#222222] md:flex">
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      <nav className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-14 lg:px-8">
        <div className="flex items-center gap-4 text-[13px] text-[#717171]">
          <span>←</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] font-semibold text-white">
            1
          </span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>24</span>
          <span>→</span>
        </div>
        <p className="text-[12px] text-[#717171]">Showing 1-24 of 1,284 products</p>
      </nav>
    </div>
  );
}
