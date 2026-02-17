"use client"
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function FAQsAccordion() {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";



    const qas = [
        {
            id: 1,
            q: "آیا امکان خرید حضوری وجود دارد؟",
            a: "بله، شما می‌توانید در ساعات کاری فروشگاه به صورت حضوری مراجعه کرده و خرید خود را انجام دهید."
        },
        {
            id: 2,
            q: "آیا امکان سفارش عمده وجود دارد؟",
            a: "بله، مدارس، شرکت‌ها و مشتریان محترم می‌توانند سفارش‌های عمده خود را ثبت کنند. برای اطلاع از قیمت همکاری با ما تماس بگیرید."
        },
        {
            id: 3,
            q: "چگونه می‌توانم سفارش خود را ثبت کنم؟",
            a: "پس از انتخاب محصولات مورد نظر، آن‌ها را به سبد خرید اضافه کرده و با تکمیل اطلاعات ارسال و پرداخت، سفارش خود را ثبت کنید."
        },
        {
            id: 4,
            q: "در صورت ثبت اشتباه سفارش چه کار کنم؟",
            a: "در سریع‌ترین زمان ممکن با پشتیبانی فروشگاه تماس بگیرید تا قبل از ارسال، سفارش شما اصلاح شود."
        },
        {
            id: 5,
            q: "چگونه می‌توانم از تخفیف‌ها و محصولات جدید مطلع شوم؟",
            a: "با دنبال کردن شبکه‌های اجتماعی فروشگاه یا عضویت در سایت می‌توانید از تخفیف‌ها و محصولات جدید باخبر شوید."
        }
    ]
    return <Accordion variant="splitted">
        {qas.map((item: { id: number, q: string, a: string }) => {
            return <AccordionItem
                key={item.id}
                title={<div className="text-sm font-bold">{item.q}</div>}
                aria-label={`Question ${item.id}`}
            >
                <div className="text-sm">{item.a}</div>
            </AccordionItem>
        })}
    </Accordion>
}