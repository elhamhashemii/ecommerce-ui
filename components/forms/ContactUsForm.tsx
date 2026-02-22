"use client";

import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactUsSection() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function clearForm() {
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // TODO: connect to your API route
        setTimeout(() => {
            setLoading(false);
            toast.success(<div className="text-sm">پیام شما با موفقیت ارسال شد 🤍</div>);
            clearForm()

        }, 1500);
    };

    return (
        <Card className="w-full">
            <CardBody>
                <p className="text-right text-default-500 text-sm my-2">
                    سوال، پیشنهاد یا انتقاد دارید؟ خوشحال می‌شویم پیام شما را دریافت کنیم.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Input
                        isRequired
                        label="نام و نام خانوادگی"
                        placeholder="نام خود را وارد کنید"
                        variant="bordered"
                        value={name}
                        onValueChange={setName}
                    />

                    <Input
                        isRequired
                        label="شماره تماس"
                        placeholder="09xxxxxxxxx"
                        variant="bordered"
                        value={phone}
                        onValueChange={setPhone}
                    />

                    <Input
                        type="email"
                        label="ایمیل (اختیاری)"
                        placeholder="example@email.com"
                        variant="bordered"
                        value={email}
                        onValueChange={setEmail}
                    />

                    <Textarea
                        isRequired
                        label="متن پیام"
                        placeholder="پیام خود را اینجا بنویسید..."
                        variant="bordered"
                        minRows={4}
                        value={message}
                        onValueChange={setMessage}
                    />

                    <Button
                        type="submit"
                        color="primary"
                        isLoading={loading}
                    >
                        ارسال پیام
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
