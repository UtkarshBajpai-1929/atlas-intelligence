import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  ExternalLink,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { ProductLogo } from "@/features/products/components/product-card";
import {
  getAllProducts,
  getProductsByCompareParams,
} from "@/features/products/lib/product.helper";

type ComparePageProps = {
  params: Promise<{ params: string }>;
};

function formatPricing(type: string, price?: number) {
  if (type === "free") return "Free";
  if (type === "custom") return "Custom";
  if (!price) return type.charAt(0).toUpperCase() + type.slice(1);
  return `$${price}/mo`;
}

function formatVisits(value?: number) {
  if (!value) return "N/A";
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  return `${Math.round(value / 1000)}K`;
}

export async function generateStaticParams() {
  return [
    { params: "cursor-ai-vs-claude" },
    { params: "cursor-ai-vs-github-copilot" },
    { params: "perplexity-vs-chatgpt" },
  ];
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { params: compareParams } = await params;
  const comparedProducts = getProductsByCompareParams(compareParams);

  if (comparedProducts.length < 2) {
    notFound();
  }

  const featureRows = [
    "AI assistant",
    "Team workspace",
    "Free plan",
    "Web access",
    "Developer workflow",
  ];

  return (
    <div>
      <section className="border-b border-[#ebebeb] bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#717171] hover:text-[#222222]"
          >
            Products
            <ArrowRight size={14} />
            Compare
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-[24px] font-bold uppercase tracking-[0.18em] text-[#ff385c]">
                <BarChart3 size={15} />
                Product Comparison
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-[46px] leading-[1.02] tracking-[-0.035em] text-[#222222] md:text-[64px]">
               {comparedProducts.map((product) => product.name).join(" vs ")}
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#717171]">
                Review positioning, pricing, categories, traction, and core
                capabilities side by side before choosing the right AI product.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {comparedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[22px] border border-[#dddddd] bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <ProductLogo product={product} size="lg" />
                      <div>
                        <h2 className="text-[20px] font-semibold text-[#222222]">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-[13px] text-[#717171]">
                          {product.company.name}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#fff1f3] px-3 py-1 text-[11px] font-semibold text-[#ff385c]">
                      {product.categories[0]?.name}
                    </span>
                  </div>
                  <p className="mt-5 min-h-14 text-[14px] leading-7 text-[#717171]">
                    {product.description}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-6 inline-flex h-10 items-center gap-2 rounded-[10px] bg-[#222222] px-4 text-[12px] font-semibold text-white"
                  >
                    View product
                    <ExternalLink size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div className="mx-auto max-w-7xl">
    <div className="overflow-x-auto rounded-[22px] border border-[#dddddd] bg-white shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
      <div className="min-w-[720px]">
        {/* Header */}
        <div
          className="grid border-b border-[#ebebeb] bg-white"
          style={{
            gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(220px, 1fr))`,
          }}
        >
          <div className="p-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#717171]">
            Snapshot
          </div>

          {comparedProducts.map((product) => (
            <div
              key={product.id}
              className="border-l border-[#ebebeb] p-5"
            >
              <div className="flex items-center gap-3">
                <ProductLogo product={product} size="sm" />

                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-[#222222]">
                    {product.name}
                  </p>

                  <p className="line-clamp-2 text-[12px] text-[#717171]">
                    {product.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Rows */}
        {[
          [
            "Pricing",
            ...comparedProducts.map((product) =>
              formatPricing(
                product.pricing.type,
                product.pricing.startingPrice
              )
            ),
          ],
          [
            "Rating",
            ...comparedProducts.map((product) =>
              product.stats.rating.toFixed(1)
            ),
          ],
          [
            "Monthly visits",
            ...comparedProducts.map((product) =>
              formatVisits(product.stats.monthlyVisits)
            ),
          ],
          [
            "Reviews",
            ...comparedProducts.map((product) =>
              product.stats.reviewCount.toLocaleString()
            ),
          ],
          [
            "Founded",
            ...comparedProducts.map((product) =>
              String(product.company.foundedYear ?? "N/A")
            ),
          ],
          [
            "Location",
            ...comparedProducts.map(
              (product) => product.company.location ?? "Global"
            ),
          ],
        ].map((row) => (
          <div
            key={row[0]}
            className="grid border-b border-[#ebebeb] last:border-b-0"
            style={{
              gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(220px, 1fr))`,
            }}
          >
            {/* Label Column */}
            <div className="bg-[#fafafa] p-5 text-[13px] font-semibold text-[#222222]">
              {row[0]}
            </div>

            {/* Data Columns */}
            {row.slice(1).map((value, index) => (
              <div
                key={`${row[0]}-${comparedProducts[index].slug}`}
                className="border-l border-[#ebebeb] p-5 text-[14px] text-[#717171]"
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* Feature Comparison */}
<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div className="mb-8">
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff385c]">
      Capabilities
    </p>

    <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-[#222222] sm:text-[32px]">
      Feature comparison
    </h2>
  </div>

  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
    {comparedProducts.map((product) => (
      <div
        key={product.id}
        className="rounded-[20px] border border-[#dddddd] bg-white p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <ProductLogo product={product} />

          <div className="min-w-0">
            <h3 className="truncate text-[18px] font-semibold text-[#222222]">
              {product.name}
            </h3>

            <p className="flex items-center gap-1 text-[12px] font-semibold text-[#ff385c]">
              <Star size={13} fill="currentColor" />
              {product.stats.rating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {featureRows.map((feature, index) => {
            const active =
              feature === "Free plan"
                ? product.pricing.type === "freemium" ||
                  product.pricing.type === "free"
                : index < product.features.length ||
                  product.categories.length > 0;

            return (
              <div
                key={feature}
                className="flex items-center justify-between rounded-[12px] bg-[#f7f7f7] px-4 py-3"
              >
                <span className="text-[13px] text-[#717171]">
                  {feature}
                </span>

                {active ? (
                  <Check size={16} className="text-[#00a699]" />
                ) : (
                  <X size={16} className="text-[#b0b0b0]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>

  {/* CTA Section */}
  <div className="mt-12 rounded-[22px] border border-[#dddddd] bg-[#222222] p-6 text-white sm:p-8">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="flex items-center gap-2 text-[12px] font-semibold text-white/65">
          <TrendingUp size={15} />
          Compare more products
        </p>

        <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.02em] sm:text-[28px]">
          Build another side-by-side view
        </h2>
      </div>

      <Link
        href={`/compare/${getAllProducts()
          .slice(0, 3)
          .map((product) => product.slug)
          .join("-vs-")}`}
        className="inline-flex h-12 items-center justify-center rounded-[12px] bg-[#ff385c] px-5 text-[14px] font-semibold text-white transition hover:opacity-90"
      >
        Compare top products
      </Link>
    </div>
  </div>
</section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff385c]">
            Capabilities
          </p>
          <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.03em] text-[#222222]">
            Feature comparison
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {comparedProducts.map((product) => (
            <div key={product.id} className="rounded-[20px] border border-[#dddddd] bg-white p-6">
              <div className="flex items-center gap-3">
                <ProductLogo product={product} />
                <div>
                  <h3 className="text-[18px] font-semibold text-[#222222]">{product.name}</h3>
                  <p className="flex items-center gap-1 text-[12px] font-semibold text-[#ff385c]">
                    <Star size={13} fill="currentColor" />
                    {product.stats.rating.toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {featureRows.map((feature, index) => {
                  const active =
                    feature === "Free plan"
                      ? product.pricing.type === "freemium" || product.pricing.type === "free"
                      : index < product.features.length || product.categories.length > 0;

                  return (
                    <div
                      key={feature}
                      className="flex items-center justify-between rounded-[12px] bg-[#f7f7f7] px-4 py-3"
                    >
                      <span className="text-[13px] text-[#717171]">{feature}</span>
                      {active ? (
                        <Check size={16} className="text-[#00a699]" />
                      ) : (
                        <X size={16} className="text-[#b0b0b0]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[22px] border border-[#dddddd] bg-[#222222] p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold text-white/65">
                <TrendingUp size={15} />
                Compare more products
              </p>
              <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.02em]">
                Build another side-by-side view
              </h2>
            </div>
            <Link
              href={`/compare/${getAllProducts().slice(0, 3).map((product) => product.slug).join("-vs-")}`}
              className="inline-flex h-12 items-center justify-center rounded-[12px] bg-[#ff385c] px-5 text-[14px] font-semibold text-white"
            >
              Compare top products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
