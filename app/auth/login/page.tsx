import { LoginForm } from "@/components/forms/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex items-center justify-center w-full pt-16 md:pt-24" >
                <LoginForm />
            </div>
        </Suspense>
    )
}