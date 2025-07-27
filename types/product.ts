import { StaticImageData } from "next/image"

export type ProductType = {
    id: number;
    img: string | StaticImageData;
    title: string;
    category: string;
    price: number;
}