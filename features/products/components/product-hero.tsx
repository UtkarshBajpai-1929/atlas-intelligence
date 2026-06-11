import { Bookmark, ExternalLink, LucideIcon, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Product } from "../types/product.types";
import { ProductLogo } from "./product-card";
import { ProductSidebar } from "./product-sidebar";

type ProductHeroProps = {
  product: Product;
};

function formatVisits(value?: number) {
  if (!value) return "N/A";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  return `${Math.round(value / 1000)}K`;
}

export function ProductHero({ product }: ProductHeroProps) {
  const compareSlug = product.alternatives[0]?.slug ?? "claude";
  const metrics: Array<[string, string, LucideIcon]> = [
    ["Upvotes", `${Math.round((product.stats.upvotes ?? 0) / 1000)}k`, TrendingUp],
    ["Visits", formatVisits(product.stats.monthlyVisits), TrendingUp],
    ["Rating", product.stats.rating.toFixed(1), Star],
    ["Reviews", product.stats.reviewCount.toLocaleString(), Star],
  ];

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-14 pt-9 lg:grid-cols-[1fr_360px] lg:px-8">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#717171]">
          <span>Products</span>
          <span>/</span>
          <span>{product.categories[0]?.name}</span>
          <span>/</span>
          <span className="font-medium text-[#2c2926]">{product.name}</span>
        </div>

        <div className="mt-8 flex items-start gap-5">
          <ProductLogo product={product} size="lg" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-[#191714] md:text-[42px]">
                {product.name}
              </h1>
              <span className="rounded-full bg-[#effaf3] px-2.5 py-1 text-[11px] font-semibold text-[#38a169]">
                Verified
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-[17px] leading-7 text-[#5d5751]">
              {product.tagline}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.categories.map((category) => (
            <span
              key={category.slug}
              className="rounded-full bg-[#f5f2ef] px-3 py-1.5 text-[12px] font-medium text-[#717171]"
            >
              {category.name}
            </span>
          ))}
          <span className="rounded-full bg-[#fff1f3] px-3 py-1.5 text-[12px] font-semibold text-[#ff385c]">
            {product.pricing.type === "freemium" ? "Freemium" : product.pricing.type}
          </span>
        </div>

        <p className="mt-7 max-w-3xl text-[15px] leading-8 text-[#717171]">
          {product.description} {product.name} gives teams a focused workspace to
          understand, create, and improve work with AI assistance woven into the
          core workflow.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={product.company.website ?? "#"}
            className="flex h-12 items-center gap-2 rounded-[12px] bg-[#ff385c] px-5 text-[14px] font-semibold text-white"
          >
            Visit website
            <ExternalLink size={16} />
          </a>
          <button className="flex h-12 items-center gap-2 rounded-[12px] border border-[#dddddd] bg-white px-5 text-[14px] font-semibold text-[#222222]">
            <Bookmark size={16} />
            Save Product
          </button>
          <Link
            href={`/compare/${product.slug}-vs-${compareSlug}`}
            className="flex h-12 items-center rounded-[12px] border border-[#dddddd] bg-white px-5 text-[14px] font-semibold text-[#222222]"
          >
            Compare
          </Link>
        </div>

        <div className="mt-9 grid max-w-3xl grid-cols-2 gap-4 rounded-[18px] border border-[#dddddd] bg-white p-4 sm:grid-cols-4">
          {metrics.map(([label, value, Icon]) => (
            <div key={label} className="px-2 py-1">
              <div className="flex items-center gap-2 text-[#ff385c]">
                <Icon size={15} />
                <span className="text-[18px] font-semibold text-[#222222]">{value}</span>
              </div>
              <p className="mt-1 text-[11px] text-[#717171]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <ProductSidebar product={product} />
    </section>
  );
}
