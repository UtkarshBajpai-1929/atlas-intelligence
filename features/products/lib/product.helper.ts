import { products } from "../data/products.data";
import { Category, Product } from "../types/product.types";

export const getAllProducts = () => products;

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getTrendingProducts = () => {
  return products.filter((product) => product.trending);
};

export const getRelatedProducts = (product: Product, limit = 6) => {
  const categorySlugs = new Set(product.categories.map((category) => category.slug));

  return products
    .filter((candidate) => candidate.slug !== product.slug)
    .filter((candidate) =>
      candidate.categories.some((category) => categorySlugs.has(category.slug)),
    )
    .slice(0, limit);
};

export const getAllCategories = (): Category[] => {
  const categoryMap = new Map<string, Category>();

  products.forEach((product) => {
    product.categories.forEach((category) => {
      categoryMap.set(category.slug, category);
    });
  });

  return Array.from(categoryMap.values());
};

const normalizeProductToken = (value: string) =>
  decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/\+/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

export const getProductsByCompareParams = (params: string): Product[] => {
  const tokens = decodeURIComponent(params)
    .split(/(?:-vs-|--vs--|,|\bvs\b|\band\b)/i)
    .map(normalizeProductToken)
    .filter(Boolean);

  const matchedProducts = tokens
    .map((token) =>
      products.find((product) => {
        const productName = normalizeProductToken(product.name);
        const productSlug = normalizeProductToken(product.slug);

        return productName === token || productSlug === token;
      }),
    )
    .filter((product): product is Product => Boolean(product));

  return Array.from(
    new Map(matchedProducts.map((product) => [product.slug, product])).values(),
  );
};
