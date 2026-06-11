import { Check, Minus } from "lucide-react";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  cta,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-[18px] border p-6 ${
        highlighted
          ? "border-[#1c2135] bg-[#171c31] text-white shadow-[0_24px_60px_rgba(20,24,45,0.2)]"
          : "border-[#dddddd] bg-white text-[#222222]"
      }`}
    >
      {highlighted ? (
        <span className="absolute right-5 top-5 rounded-full bg-[#ff385c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
          Most popular
        </span>
      ) : null}
      <p className={`text-[12px] font-semibold ${highlighted ? "text-white/60" : "text-[#717171]"}`}>
        {name}
      </p>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-[40px] font-semibold leading-none tracking-[-0.03em]">{price}</span>
        {price !== "Custom" ? (
          <span className={`pb-1 text-[12px] ${highlighted ? "text-white/50" : "text-[#717171]"}`}>
            / month
          </span>
        ) : null}
      </div>
      <p className={`mt-3 min-h-10 text-[13px] leading-6 ${highlighted ? "text-white/58" : "text-[#717171]"}`}>
        {description}
      </p>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => {
          const Icon = feature.startsWith("-") ? Minus : Check;
          return (
            <li
              key={feature}
              className={`flex gap-3 text-[12px] leading-5 ${highlighted ? "text-white/75" : "text-[#717171]"} ${index > 5 ? "opacity-60" : ""}`}
            >
              <Icon size={14} className={highlighted ? "mt-0.5 text-[#ff385c]" : "mt-0.5 text-[#ff385c]"} />
              <span>{feature.replace(/^-/, "")}</span>
            </li>
          );
        })}
      </ul>
      <button
        className={`mt-7 h-11 w-full rounded-[11px] text-[13px] font-semibold ${
          highlighted
            ? "bg-[#ff385c] text-white"
            : "border border-[#dddddd] bg-white text-[#222222]"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
