import { StaticImageData } from "next/image"

export type ProductType = {
    id: number;
    imageUrls: string[];
    title: string;
    category: string;
    price: number;
    stock: number
    slug: string;
    soldCount?: number;
    attributes?: any[];
    description?: string;
}

export type CartItemType = {
    id: number;
    createdAt?: string;
    updatedAt?: string;
    qty: number
    product: ProductType
}