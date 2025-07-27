import SampleSlider from "@/components/sliders/SampleSlider";
import ProductsGroup from "@/components/lists/ProductsGroup";
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
      img: "https://media.worldofinteriors.com/photos/64e63665be3320b594bf6e12/4:3/w_1920,c_limit/WoI-Covets-Stationery_Cover.jpg"
    },
    { 
      id: 2,
      title: "ماژیک هایلایتر Panter رنگ یاسی Original - Made In Korea",
      category: "نام دسته بندی",
      price: 145000,
      img: "https://media.worldofinteriors.com/photos/64e63665be3320b594bf6e12/4:3/w_1920,c_limit/WoI-Covets-Stationery_Cover.jpg"
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
