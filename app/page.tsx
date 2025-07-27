import ProductCard from "@/components/cards/ProductCard";
import SampleSlider from "@/components/sliders/SampleSlider";
import Product1 from "../public/product (1).jpg"
import Product2 from "../public/product (2).jpg"
import ProductsGroup from "@/components/grids/ProductsGroup";
import { ProductType } from "@/types/product";

async function fetchProducts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function Home() {
  const products = await fetchProducts();

  const items: ProductType[] = [
    { 
      id: 1,
      title: "ماژیک هایلایتر Panter رنگ یاسی Original - Made In Korea",
      category: "نام دسته بندی",
      price: 75000,
      img: Product1
    },
    { 
      id: 2,
      title: "ماژیک هایلایتر Panter رنگ یاسی Original - Made In Korea",
      category: "نام دسته بندی",
      price: 145000,
      img: Product2
    },
  ]

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SampleSlider />
      <ProductsGroup products={items} />
      <div className="w-full bg-amber-500 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        Slider
      </div>
    </section>
  );
}
