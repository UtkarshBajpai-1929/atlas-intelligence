import { Suspense } from "react";
import { ProductsExplorer } from "@/features/products/components/products-explorer";
import {
  getAllCategories,
  getAllProducts,
} from "@/features/products/lib/product.helper";

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsExplorer products={getAllProducts()} categories={getAllCategories()} />
    </Suspense>
  );
}
