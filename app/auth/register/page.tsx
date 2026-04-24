import { SignUpForm } from "@/components/forms/SignUpForm";
import { Suspense } from "react";

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <SignUpForm />
            </div>
        </Suspense>
    )
}