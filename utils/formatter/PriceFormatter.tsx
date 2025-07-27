import { content } from "@/config/const";

export function PriceFormatter(price: number) {
    return `${price.toLocaleString()} ${content.currencyUnit}`
}