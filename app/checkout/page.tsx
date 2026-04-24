import CheckoutClient from "@/components/product/CheckoutClient";
import { Suspense } from "react";


export default function CheckoutPage() {

    return <Suspense fallback={<div>Loading...</div>}>
        <CheckoutClient />
    </Suspense>
}