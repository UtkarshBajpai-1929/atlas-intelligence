"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Category, Pricing, Product } from "../types/product.types";
import { ProductCard } from "./product-card";
import { ProductGrid } from "./product-grid";

type ProductsExplorerProps = {
  products: Product[];
  categories: Category[];
};

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Trending", value: "trending" },
  { label: "Popularity", value: "popularity" },
  { label: "Launch Date", value: "launch-date" },
  { label: "Recently Added", value: "recently-added" },
  { label: "Pricing", value: "pricing" },
];

const pageSize = 12;

function formatPricingLabel(type: Pricing["type"]) {
  if (type === "freemium") return "Freemium";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function matchesSearch(product: Product, query: string) {
  if (!query) return true;

  const searchableText = [
    product.name,
    product.tagline,
    product.description,
    product.company.name,
    ...product.categories.map((category) => category.name),
    ...product.features.map((feature) => `${feature.title} ${feature.description}`),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

function sortProducts(products: Product[], sort: string) {
  return [...products].sort((a, b) => {
    if (sort === "popularity") {
      return (b.stats.monthlyVisits ?? 0) - (a.stats.monthlyVisits ?? 0);
    }

    if (sort === "launch-date") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    if (sort === "recently-added") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sort === "pricing") {
      return (a.pricing.startingPrice ?? 0) - (b.pricing.startingPrice ?? 0);
    }

    return Number(b.trending) - Number(a.trending) || (b.stats.upvotes ?? 0) - (a.stats.upvotes ?? 0);
  });
}

export function ProductsExplorer({ products, categories }: ProductsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const pricing = searchParams.get("pricing") ?? "all";
  const sort = searchParams.get("sort") ?? "trending";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const [searchValue, setSearchValue] = useState(q);

  const pricingOptions = useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.pricing.type))).map((type) => ({
        label: formatPricingLabel(type),
        value: type,
      })),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = normalize(q);
    const filtered = products.filter((product) => {
      const categoryMatch =
        category === "all" ||
        product.categories.some((productCategory) => productCategory.slug === category);
      const pricingMatch = pricing === "all" || product.pricing.type === pricing;

      return categoryMatch && pricingMatch && matchesSearch(product, query);
    });

    return sortProducts(filtered, sort);
  }, [category, pricing, products, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const trendingProducts = sortProducts(
    products.filter((product) => product.trending),
    "trending",
  ).slice(0, 3);
  const hasActiveFilters = Boolean(q) || category !== "all" || pricing !== "all" || sort !== "trending";

  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all" || (key === "sort" && value === "trending")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (!Object.prototype.hasOwnProperty.call(updates, "page")) {
      params.delete("page");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateQuery({ q: searchValue.trim() || null });
  };

  return (
    <div>
      <section className="border-b border-[#ebebeb] bg-[#FAF9F6] px-6 pb-10 pt-10 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#dddddd] bg-white px-4 py-2 text-[12px] font-semibold text-[#717171] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <Sparkles size={14} className="text-[#ff385c]" />
            1,284 products · updated daily
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl font-semibold font-serif text-[48px] leading-[0.98] tracking-[-0.035em] text-[#222222] md:text-[72px]">
            Discover The World&apos;s
            <span className="block italic font-medium text-[#ff385c]">Best AI Products.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-[640px] text-[17px] leading-8 text-[#717171]">
            Atlas is the modern intelligence layer for the AI economy. Search,
            compare and follow the people and products shaping the next decade.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-10 flex w-full max-w-[860px] items-center rounded-full border border-[#dddddd] bg-white p-2 shadow-[0_14px_42px_rgba(0,0,0,0.07)] focus-within:border-[#b0b0b0]"
          >
            <Search size={20} className="ml-4 shrink-0 text-[#717171]" />
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#222222] outline-none placeholder:text-[#717171]"
              placeholder="Search 1,200+ AI products by name, category or use case"
            />
            {searchValue ? (
              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                  updateQuery({ q: null });
                }}
                className="mr-2 flex h-9 w-9 items-center justify-center rounded-full text-[#717171] hover:bg-[#f7f7f7]"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            ) : null}
            <button className="h-12 rounded-full bg-[#ff385c] px-7 text-[14px] font-semibold text-white shadow-[0_10px_22px_rgba(255,56,92,0.22)] transition hover:bg-[#e31c5f]">
              Search
            </button>
          </form>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px] text-[#717171]">
            <span className="mr-1">Trending:</span>
            {categories.slice(0, 4).map((item) => (
              <button
                key={item.slug}
                onClick={() => updateQuery({ category: item.slug })}
                className="rounded-full border border-[#dddddd] bg-white px-4 py-2 text-[#222222] shadow-[0_8px_18px_rgba(0,0,0,0.035)] transition hover:border-[#b0b0b0]"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-[#ebebeb] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-5 lg:px-8">
          <button
            onClick={() => updateQuery({ category: "all" })}
            className={`flex h-11 shrink-0 items-center rounded-full border px-5 text-[13px] font-semibold transition ${
              category === "all"
                ? "border-[#222222] bg-[#222222] text-white"
                : "border-[#dddddd] bg-white text-[#222222] hover:border-[#b0b0b0]"
            }`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              onClick={() => updateQuery({ category: item.slug })}
              className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-[13px] font-semibold transition ${
                category === item.slug
                  ? "border-[#222222] bg-[#222222] text-white"
                  : "border-[#dddddd] bg-white text-[#222222] hover:border-[#b0b0b0]"
              }`}
            >
              <span className={category === item.slug ? "text-white" : "text-[#ff385c]"}>✦</span>
              {item.name}
            </button>
          ))}
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-[34px] font-semibold leading-tight tracking-[-0.02em] text-[#222222] md:text-[40px]">
              All AI products
            </h2>
            <p className="mt-2 text-[14px] text-[#717171]">
              Showing {filteredProducts.length} of {products.length} products.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateQuery({ sort: option.value })}
                className={`flex h-10 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition ${
                  sort === option.value
                    ? "border-[#222222] bg-[#222222] text-white"
                    : "border-[#dddddd] bg-white text-[#717171] hover:border-[#b0b0b0] hover:text-[#222222]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7 flex flex-wrap items-center gap-3 rounded-[22px] border border-[#dddddd] bg-[#f7f7f7] p-3">
          <div className="flex items-center gap-2 px-2 text-[13px] font-semibold text-[#222222]">
            <SlidersHorizontal size={15} />
            Filters
          </div>
          <button
            onClick={() => updateQuery({ pricing: "all" })}
            className={`h-9 rounded-full border px-4 text-[12px] font-semibold transition ${
              pricing === "all"
                ? "border-[#222222] bg-white text-[#222222] shadow-sm"
                : "border-transparent bg-transparent text-[#717171] hover:bg-white"
            }`}
          >
            All pricing
          </button>
          {pricingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateQuery({ pricing: option.value })}
              className={`h-9 rounded-full border px-4 text-[12px] font-semibold transition ${
                pricing === option.value
                  ? "border-[#222222] bg-white text-[#222222] shadow-sm"
                  : "border-transparent bg-transparent text-[#717171] hover:bg-white"
              }`}
            >
              {option.label}
            </button>
          ))}
          {hasActiveFilters ? (
            <button
              onClick={() => {
                setSearchValue("");
                router.replace(pathname, { scroll: false });
              }}
              className="ml-auto flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-semibold text-[#ff385c] hover:bg-white"
            >
              Clear filters
              <X size={14} />
            </button>
          ) : null}
        </div>

        {paginatedProducts.length ? (
          <ProductGrid products={paginatedProducts} />
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#b0b0b0] bg-[#f7f7f7] px-6 py-16 text-center">
            <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[#222222]">
              No products found
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[#717171]">
              Try a different keyword, category, pricing option, or clear the
              active filters to view the full catalog.
            </p>
          </div>
        )}
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
          <button
            onClick={() => updateQuery({ sort: "trending" })}
            className="hidden items-center gap-2 text-[14px] font-semibold text-[#222222] md:flex"
          >
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      <nav className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-14 lg:px-8">
        <div className="flex items-center gap-3 text-[13px] text-[#717171]">
          <button
            disabled={currentPage === 1}
            onClick={() => updateQuery({ page: String(currentPage - 1) })}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-white disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => updateQuery({ page: String(pageNumber) })}
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  currentPage === pageNumber
                    ? "bg-[#222222] text-white"
                    : "border border-[#dddddd] bg-white text-[#717171]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            disabled={currentPage === totalPages}
            onClick={() => updateQuery({ page: String(currentPage + 1) })}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-white disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="text-[12px] text-[#717171]">
          Showing {paginatedProducts.length ? (currentPage - 1) * pageSize + 1 : 0}-
          {Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products
        </p>
      </nav>
    </div>
  );
}
