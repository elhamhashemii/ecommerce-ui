"use client";

import { Card, CardBody } from "@heroui/card";
import {
    FaInstagram,
    FaWhatsapp,
    FaTelegramPlane,
} from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

import eitaa from "@/public/icons/eitaa.png"
import bale from "@/public/icons/bale.jpg"
import rubika from "@/public/icons/rubika.png";
import telegram from "@/public/icons/telegram.png";
import whatsapp from "@/public/icons/whatsapp.png";
import instagram from "@/public/icons/instagram.png";
import Image from "next/image";

export default function SocialMediaSection() {
    const socials = [
        {
            name: "Instagram",
            icon: <Image alt="instagram" src={instagram} />,
            link: "https://instagram.com/tahrir_124",
        },
        {
            name: "WhatsApp",
            icon: <Image alt="whatsapp" src={whatsapp} />,
            link: "#",
        },
        {
            name: "Telegram",
            icon: <Image alt="telegram" src={telegram} />,
            link: "#",
        },
        {
            name: "Itaa",
            icon: <Image alt="eitaa" src={eitaa} />,
            link: "#",
        },
        {
            name: "Baale",
            icon: <Image alt="bale" src={bale} />,
            link: "#",
        },
        {
            name: "Rubika",
            icon: <Image alt="rubika" src={rubika} />,
            link: "#",
        },
    ];

    return (
        <section className="w-full flex justify-center">
            <Card shadow="sm" className="w-full rounded-3xl">
                <CardBody className="flex flex-col items-center gap-6 py-6 md:py-10">
                    <h2 className="text-md md:text-xl font-semibold text-center">ما را در شبکه‌های اجتماعی دنبال کنید</h2>

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {socials.map((item) => {
                            const Icon = item?.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.link}
                                    target="_blank"
                                    className="group w-10 md:w-14 h-10 md:h-14 flex items-center justify-center
                             rounded-2xl transition-all duration-200
                             hover:scale-105 p-1 hover:shadow-lg"
                                >
                                    <>{Icon}</>
                                </a>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>
        </section>
    );
}
