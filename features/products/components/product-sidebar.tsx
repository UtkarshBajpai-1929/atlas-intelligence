import { ArrowUpRight } from "lucide-react";
import { Product } from "../types/product.types";
import { ProductLogo } from "./product-card";

type ProductSidebarProps = {
  product: Product;
};

export function ProductSidebar({ product }: ProductSidebarProps) {
  const rows = [
    ["Category", product.categories[0]?.name ?? "AI"],
    ["Pricing", product.pricing.type === "freemium" ? "Freemium" : product.pricing.type],
    ["Founded", product.company.foundedYear?.toString() ?? "N/A"],
    ["Company", product.company.name],
    ["Location", product.company.location ?? "Global"],
  ];

  return (
    <aside className="rounded-[18px] border border-[#dddddd] bg-white p-5 shadow-[0_16px_40px_rgba(29,24,20,0.05)]">
      <div className="rounded-[14px] bg-[#11182b] p-4 text-white">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
          Product Snapshot
        </p>
        <div className="mt-6 flex items-center gap-3">
          <ProductLogo product={product} size="sm" />
          <div>
            <p className="text-[14px] font-semibold">{product.name}</p>
            <p className="text-[11px] text-white/55">{product.company.name}</p>
          </div>
        </div>
      </div>

      <dl className="mt-4 divide-y divide-[#ebebeb]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3 text-[12px]">
            <dt className="text-[#9b938c]">{label}</dt>
            <dd className="text-right font-medium capitalize text-[#222222]">{value}</dd>
          </div>
        ))}
      </dl>

      <a
        href={product.company.website ?? "#"}
        className="mt-4 flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#ff385c] text-[13px] font-semibold text-white shadow-[0_12px_20px_rgba(255,95,115,0.2)]"
      >
        Visit website
        <ArrowUpRight size={15} />
      </a>
    </aside>
  );
}
