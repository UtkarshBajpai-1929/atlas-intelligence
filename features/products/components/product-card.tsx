import Link from "next/link";
import { Bookmark, TrendingUp } from "lucide-react";
import { Product } from "../types/product.types";

const logoStyles: Record<string, string> = {
  "cursor-ai": "bg-[#0b1020] text-white",
  claude: "bg-[#d97759] text-white",
  perplexity: "bg-[#22858a] text-white",
  midjourney: "bg-[#111111] text-white",
  elevenlabs: "bg-black text-white",
  "github-copilot": "bg-[#14171a] text-white",
  windsurf: "bg-[#075985] text-white",
  "replit-agent": "bg-[#ff6b00] text-white",
  codeium: "bg-[#10a37f] text-white",
  "notion-ai": "bg-white text-[#111] ring-1 ring-[#e6e0da]",
  linear: "bg-[#615ef0] text-white",
  chatgpt: "bg-[#10b981] text-white",
  gemini: "bg-gradient-to-br from-[#5b5ff0] to-[#ff4fb8] text-white",
  clay: "bg-[#f59e0b] text-white",
  "glass-health": "bg-[#ef5b78] text-white",
};

type ProductCardProps = {
  product: Product;
  compact?: boolean;
  className?: string;
};

export function productLogoClass(slug: string) {
  return logoStyles[slug] ?? "bg-[#111827] text-white";
}

export function ProductLogo({
  product,
  size = "md",
}: {
  product: Product | { name: string; slug: string };
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "h-9 w-9 text-[13px]",
    md: "h-12 w-12 text-[18px]",
    lg: "h-14 w-14 text-xl",
  }[size];

  return (
    <div
      className={`${sizeClass} ${productLogoClass(product.slug)} flex shrink-0 items-center justify-center rounded-[14px] font-semibold shadow-sm`}
    >
      {product.name.charAt(0)}
    </div>
  );
}

export function ProductCard({ product, compact = false, className = "" }: ProductCardProps) {
  const primaryCategory = product.categories[0]?.name ?? "AI";
  const pricingLabel =
    product.pricing.type === "freemium"
      ? "Freemium"
      : product.pricing.type.charAt(0).toUpperCase() + product.pricing.type.slice(1);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block rounded-[18px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_34px_rgba(29,24,20,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-[#cfcfcf] hover:shadow-[0_18px_42px_rgba(29,24,20,0.06)] ${compact ? "min-h-[188px]" : "min-h-[196px]"} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <ProductLogo product={product} />
          <div className="min-w-0 pt-0.5">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-[15px] font-semibold leading-tight text-[#222222]">
                {product.name}
              </h3>
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#f1a3ae] text-[9px] font-medium text-[#f05d73]">
                o
              </span>
            </div>
            <p className="mt-1 text-[12px] leading-none text-[#717171]">
              {product.company.name}
            </p>
          </div>
        </div>
        <Bookmark
          size={17}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-[#9f9891] transition group-hover:text-[#111111]"
        />
      </div>

      <p className="mt-5 line-clamp-2 text-[14px] leading-6 text-[#5f5a55]">
        {product.description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#f7f4f1] px-2.5 py-1 text-[11px] font-medium text-[#665f58]">
            {primaryCategory}
          </span>
          <span className="rounded-full bg-[#eef6fb] px-2.5 py-1 text-[11px] font-semibold text-[#3b82a0]">
            {pricingLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#2c2a28]">
          <TrendingUp size={13} strokeWidth={2} className="text-[#ef5b6f]" />
          {Math.round(product.stats.rating * 20)}
        </div>
      </div>
    </Link>
  );
}
