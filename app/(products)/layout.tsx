import { ProductFooter, ProductNav } from "@/features/products/components/site-chrome";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-[#222222]">
      <ProductNav />
      <main>{children}</main>
      <ProductFooter />
    </div>
  );
}
