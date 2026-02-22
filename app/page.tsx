import SampleSlider from "@/components/sliders/SampleSlider";
import ProductsGroup from "@/components/lists/ProductsGroup";
import { ProductType } from "@/types/product";
import { productsData } from "@/config/const";
import { fetchCategories, fetchProducts } from "@/actions/server/serverActions";
import SocialMediaSection from "@/components/lists/SocialMediaSection";
import CategoriesList from "@/components/lists/CategoriesList";
import BestSellerSlider from "@/components/sliders/BestSellerSlider";

export default async function Home() {
  const products: any = await fetchProducts();
  const categories: any = await fetchCategories();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SampleSlider />
      <div className="my-6 md:my-12 w-full">
        <CategoriesList data={categories} />
      </div>
      <div className="w-full">
        <BestSellerSlider products={products.items} />
      </div>
      {/* <ProductsGroup className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" products={products.items} />
      <div className="w-full bg-amber-500 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        Slider
      </div> */}
      <section className="rounded-xl w-full py-24 bg-gradient-to-r from-[#f9f6ff] to-[#fef6f8]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-4">
            به جمع خلاق ما بپیوندید ✨
          </h3>
          <p className="text-gray-600 mb-8">
            از جدیدترین محصولات و پیشنهادهای ویژه زودتر از همه باخبر شوید.
          </p>
        </div>
      </section>
      <SocialMediaSection />
    </section>
  );
}
