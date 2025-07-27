import ProductCard from "../cards/ProductCard";
import { ProductType } from "@/types/product";

export default function ProductsGroup({ products }: { products: ProductType[] }) {
    return (
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 [grid-template-rows:masonry]">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }