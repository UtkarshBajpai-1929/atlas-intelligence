import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Check,
  Code2,
  Cpu,
  ExternalLink,
  Globe2,
  Lightbulb,
  LucideIcon,
  MapPin,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Wand2,
} from "lucide-react";
import { AlternativeCard } from "@/features/products/components/alternative-card";
import { PricingCard } from "@/features/products/components/pricing-card";
import { ProductCard, ProductLogo } from "@/features/products/components/product-card";
import { ProductHero } from "@/features/products/components/product-hero";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/features/products/lib/product.helper";
import { Product } from "@/features/products/types/product.types";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const audienceCards = [
  {
    title: "Solo Developers",
    description: "Write better features, tests, and documentation with code-aware assistance.",
    icon: Code2,
  },
  {
    title: "Startup Teams",
    description: "Ship features faster with AI pair-programming across shared codebases.",
    icon: Rocket,
  },
  {
    title: "Enterprise Engineering",
    description: "Bring AI-assisted development into larger teams and existing workflows.",
    icon: Building2,
  },
];

const featureIcons = [Sparkles, MessageSquare, ShieldCheck, Lightbulb, Globe2, Wand2, Cpu, TerminalSquare];

function DemoPanel({ product }: { product: Product }) {
  return (
    <section className="bg-[#f7f7f7] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
          Product demo
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.02em] text-[#222222]">
          See it in action
        </h2>

        <div className="mt-8 overflow-hidden rounded-[18px] border border-[#161616] bg-black shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
          <div className="flex h-8 items-center gap-2 border-b border-white/10 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-[11px] text-white/45">{product.name} demo</span>
          </div>
          <div className="grid min-h-[370px] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r">
              <div className="font-mono text-[12px] leading-6 text-[#78f0b4]">
                <p className="text-white/40">{`// Welcome back, builder`}</p>
                <p className="mt-4 text-[#ffcf6b]">function shipFeature() {"{"}</p>
                <p className="pl-5">const context = await indexCodebase();</p>
                <p className="pl-5">const plan = ai.generatePatch(context);</p>
                <p className="pl-5">return review(plan).then(merge);</p>
                <p className="text-[#ffcf6b]">{"}"}</p>
              </div>
            </div>
            <div className="p-7">
              <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/35">
                  Agent terminal
                </p>
                <div className="mt-5 space-y-3 font-mono text-[12px] leading-6 text-white/75">
                  <p>
                    <span className="text-[#ff385c]">$</span> analyze current onboarding flow
                  </p>
                  <p className="text-white/45">Reading components, API routes, and tests...</p>
                  <p className="text-[#78f0b4]">Found 4 improvements and generated a patch.</p>
                  <p className="text-white/45">Ready for review in editor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-20 rounded-[10px] border border-[#282828] bg-[#111] p-3 font-mono text-[10px] leading-4 text-white/60"
            >
              <span className="text-[#ff385c]">0{item}</span>
              <br />
              preview / terminal / code
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const alternativeProducts = product.alternatives
    .map((alternative) => getProductBySlug(alternative.slug))
    .filter((candidate): candidate is Product => Boolean(candidate))
    .slice(0, 4);
  const relatedProducts = getRelatedProducts(product, 6);
  const companyFacts: Array<[string, string, LucideIcon]> = [
    ["Founded", String(product.company.foundedYear ?? "2022"), Building2],
    ["Team size", "101 people", Users],
    ["Location", product.company.location ?? "Global", MapPin],
    [
      "Website",
      product.company.website?.replace("https://", "") ?? "atlas.ai",
      Globe2,
    ],
  ];

  return (
    <div>
      <ProductHero product={product} />
      <DemoPanel product={product} />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
            Overview
          </p>
          <h2 className="mt-4 max-w-xl text-[31px] font-semibold leading-tight tracking-[-0.025em] text-[#222222]">
            The editor built for the age of AI
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-[#717171]">
            {product.name} helps teams move from idea to implementation with a
            workflow that combines model assistance, project context, and the
            familiar structure of modern software tools.
          </p>
          <ul className="mt-8 space-y-3 text-[14px] text-[#717171]">
            {[
              "Context-aware suggestions that understand your entire codebase",
              "Chat with your code using models, docs, and files",
              "One-click bug fixes and smarter refactoring",
              "Works with many languages and frameworks",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={16} className="mt-1 text-[#ff385c]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          {audienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[16px] border border-[#dddddd] bg-[#f7f7f7] p-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1f3] text-[#ff385c]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#222222]">{card.title}</h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#717171]">{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
            Key features
          </p>
          <h2 className="mt-4 max-w-xl text-[31px] font-semibold leading-tight tracking-[-0.025em] text-[#222222]">
            Everything you need to code at the speed of thought
          </h2>
          <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#717171]">
            Core capabilities designed for fast, context-aware work across the
            entire product development cycle.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <div key={feature.title} className="rounded-[16px] border border-[#dddddd] bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1f3] text-[#ff385c]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold text-[#222222]">{feature.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-[#717171]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
          Pricing
        </p>
        <h2 className="mt-4 text-[31px] font-semibold tracking-[-0.025em] text-[#222222]">
          Simple, transparent pricing
        </h2>
        <p className="mt-3 text-[14px] text-[#717171]">
          Start for free. Upgrade when you&apos;re ready. No surprises.
        </p>

        <div className="mt-10 grid gap-5 text-left md:grid-cols-3">
          <PricingCard
            name="Free"
            price="$0"
            description="Start coding with AI tools."
            cta="Get Started Free"
            features={[
              "2,000 autocomplete credits",
              "Basic AI file analysis",
              "Basic codebase indexing",
              "1 workspace",
              "-Community support",
              "-No private agents",
            ]}
          />
          <PricingCard
            name="Pro"
            price={`$${product.pricing.startingPrice ?? 20}`}
            description="For serious development."
            cta="Start Free Trial"
            highlighted
            features={[
              "Unlimited AI completions",
              "Fast model access",
              "Advanced context and search",
              "Full codebase indexing",
              "Priority support",
              "AI-free business controls",
            ]}
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            description="For teams that need scale and control."
            cta="Contact Sales"
            features={[
              "Everything in Pro",
              "Advanced team controls",
              "SSO / SAML authentication",
              "Admin dashboard",
              "Custom security workflows",
              "Dedicated support",
            ]}
          />
        </div>
        <p className="mt-6 text-[11px] text-[#717171]">
          All plans include a 7-day free trial where available. No credit card required.
        </p>
      </section>

      <section className="bg-[#f7f7f7] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
            Company
          </p>
          <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.02em] text-[#222222]">
            Behind the product
          </h2>

          <div className="mt-8 grid overflow-hidden rounded-[18px] border border-[#dddddd] bg-white shadow-[0_18px_48px_rgba(29,24,20,0.045)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8">
              <div className="flex items-center gap-4">
                <ProductLogo product={product} />
                <div>
                  <h3 className="text-[16px] font-semibold text-[#222222]">
                    {product.company.name}
                  </h3>
                  <p className="text-[12px] text-[#717171]">{product.name}</p>
                </div>
              </div>
              <p className="mt-6 max-w-xl text-[14px] leading-7 text-[#717171]">
                {product.company.name} builds AI products for modern teams and
                individuals. The company focuses on practical workflows, strong
                product craft, and tools that improve how people work every day.
              </p>
              <Link
                href={product.company.website ?? "#"}
                className="mt-7 inline-flex h-10 items-center gap-2 rounded-[10px] bg-[#11182b] px-4 text-[12px] font-semibold text-white"
              >
                View Company Profile
                <ExternalLink size={14} />
              </Link>
            </div>

            <div className="grid border-t border-[#dddddd] p-8 sm:grid-cols-2 lg:border-l lg:border-t-0">
              {companyFacts.map(([label, value, Icon]) => (
                <div key={label} className="border-b border-[#ebebeb] py-5">
                  <div className="flex items-center gap-2 text-[12px] text-[#717171]">
                    <Icon size={14} />
                    {label}
                  </div>
                  <p className="mt-2 text-[14px] font-semibold text-[#222222]">{value}</p>
                </div>
              ))}
              <div className="sm:col-span-2 pt-5">
                <p className="text-[12px] text-[#717171]">Latest funding</p>
                <p className="mt-2 text-[18px] font-semibold text-[#222222]">$60M Series B</p>
                <p className="mt-1 text-[12px] text-[#717171]">
                  Backed by leading technology investors and operators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
              Alternatives
            </p>
            <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.02em] text-[#222222]">
              Compare alternatives
            </h2>
          </div>
          <Link href="/products" className="hidden items-center gap-2 text-[13px] font-semibold text-[#ff385c] md:flex">
            See comparison
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {alternativeProducts.map((alternative, index) => (
            <AlternativeCard key={alternative.id} product={alternative} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff385c]">
                Related
              </p>
              <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.02em] text-[#222222]">
                Explore more AI products
              </h2>
            </div>
            <Link href="/products" className="hidden items-center gap-2 text-[13px] font-semibold text-[#ff385c] md:flex">
              Browse all products
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} compact />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
