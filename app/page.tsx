import SampleSlider from "@/components/sliders/SampleSlider";
import ProductsGroup from "@/components/lists/ProductsGroup";
import { ProductType } from "@/types/product";
import { productsData } from "@/config/const";
import { fetchProducts } from "@/actions/server/serverActions";

export default async function Home() {
  const products: any = await fetchProducts();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SampleSlider />
      <ProductsGroup className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" products={products.items} />
      <div className="w-full bg-amber-500 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        Slider
      </div>
    </section>
  );
}
