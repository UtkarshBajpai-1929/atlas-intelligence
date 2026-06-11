import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "../types/product.types";
import { ProductLogo } from "./product-card";

const stripeColors = ["bg-[#111827]", "bg-[#24a8c7]", "bg-[#f59e0b]", "bg-[#7c3aed]"];

type AlternativeCardProps = {
  product: Product;
  index: number;
};

export function AlternativeCard({ product, index }: AlternativeCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block overflow-hidden rounded-[16px] border border-[#dddddd] bg-white shadow-[0_12px_30px_rgba(29,24,20,0.035)]"
    >
      <div className={`h-1.5 ${stripeColors[index % stripeColors.length]}`} />
      <div className="p-5">
        <div className="flex items-start gap-3">
          <ProductLogo product={product} size="sm" />
          <div>
            <h3 className="text-[14px] font-semibold text-[#222222]">{product.name}</h3>
            <p className="text-[11px] text-[#717171]">{product.company.name}</p>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 min-h-10 text-[12px] leading-5 text-[#717171]">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1 font-semibold text-[#ff385c]">
            <Star size={12} fill="currentColor" />
            {product.stats.rating.toFixed(1)}
          </span>
          <span className="text-[#222222]">
            {product.pricing.type === "paid" ? "Paid" : "Free + Options"}
          </span>
        </div>
      </div>
    </Link>
  );
}
