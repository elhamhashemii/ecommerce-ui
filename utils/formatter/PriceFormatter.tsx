import { content } from "@/config/content";

export function PriceFormatter(price: number) {
    return `${price.toLocaleString()} ${content.currencyUnit}`
}