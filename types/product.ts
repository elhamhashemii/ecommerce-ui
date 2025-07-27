import { StaticImageData } from "next/image"

export type ProductType = {
    id: number;
    img: string | StaticImageData;
    title: string;
    category: string;
    price: number;
}

export type CartItemType = {
    id: number
    title: string
    price: number
    qty: number
    img: string | StaticImageData | any;
  }