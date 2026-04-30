import { Card } from "@heroui/card"
import { BottomAppBar } from "./BottomAppBar"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { SocialItem } from "@/types/siteConfig"
import EnamadLogo from "./EnamadLogo"


export const Footer = () => {
    return <footer className="w-full flex flex-col items-center justify-center container mx-auto max-w-7xl px-6">
        <BottomAppBar />
        <Card className="w-full p-2 hidden md:block" shadow="sm">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 p-4">
                <div className="w-full md:basis-1/3 text-lg font-semibold">{siteConfig.shopName}</div>
                <div className="flex items-center justify-end gap-2 w-full md:basis-2/3">
                    {siteConfig.socials.map((item: SocialItem) => {
                        return <Link key={item.key} href={item.href} target="_blank">{item.icon}</Link>
                    })}
                </div>
            </div>
        </Card>
        <EnamadLogo />
        <div className="text-center mt-4 mb-1 hidden md:block" style={{ direction: "ltr" }}>Developed By <Link target="_blank" href={siteConfig.links.developer} className="text-blue-400">Elham Hashemi</Link>💙</div>
    </footer >
}