import { CartItemType } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { getUserCart, updateUserCart } from "@/actions/client/clientActions";

export function mergeCarts(cart1: CartItemType[], cart2: CartItemType[]) {
    const merged = [...cart1, ...cart2];

    const map = new Map();

    for (const item of merged) {
        const key = item.product.id; // change if your key is different

        if (map.has(key)) {
            map.get(key).qty += item.qty;
        } else {
            map.set(key, { ...item });
        }
    }

    return Array.from(map.values());
}

export async function syncCartAfterLogin() {
    const localItems = useCartStore.getState().items;

    // nothing to sync
    if (!localItems?.length) return;

    try {
        const backendItems = (await getUserCart()) as CartItemType[];

        const merged = mergeCarts(backendItems, localItems);
        const updatedCart = merged.map((item: CartItemType) => {
            return { productId: item.product.id, qty: item.qty }
        })

        await updateUserCart(updatedCart);

        // clear guest cart after successful sync
        useCartStore.getState().setCart(merged)

    } catch (err) {
        console.error("Cart sync failed:", err);
    }
}
