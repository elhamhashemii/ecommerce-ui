import SampleSlider from "@/components/sliders/SampleSlider";
import ProductsGroup from "@/components/lists/ProductsGroup";
import { ProductType } from "@/types/product";
import { productsData } from "@/config/const";

async function fetchProducts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}


export default async function Home() {
  const products = await fetchProducts();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SampleSlider />
      <ProductsGroup className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" products={productsData} />
      <div className="w-full bg-amber-500 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        Slider
      </div>
    </section>
  );
}
