import ProductCard from "../cards/ProductCard";
import { ProductType } from "@/types/product";

interface IProps {
  className: string;
  products: ProductType[]
}

export default function ProductsGroup(props: IProps) {
  const { products, className } = props;
    return (
     <div className={`grid ${className} gap-x-4 [grid-template-rows:masonry]`}>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }