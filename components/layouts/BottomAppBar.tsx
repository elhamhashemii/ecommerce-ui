"use client"

import { content } from "@/config/const"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { TbBuildingStore, TbShoppingCart, TbSmartHome, TbUser } from "react-icons/tb";

type BottomAppBarItem = {
    key: number;
    href: string;
    label: string;
    icon: IconType;
}


// hover:text-[#ff7777]

export const BottomAppBar = () => {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const BottomAppBarItems: BottomAppBarItem[] = [
        { key: 0, href: "/", label: content.home, icon: TbSmartHome },
        { key: 1, href: "/shop", label: content.shop, icon: TbBuildingStore },
        { key: 2, href: "/cart", label: content.cart, icon: TbShoppingCart },
        { key: 3, href: "/profile", label: content.profile, icon: TbUser }
    ]
    
    if (!mounted) return null;

    return <div className="w-full fixed md:hidden bottom-0 left-0 right-0 z-50 border-t border-t-gray-200 flex items-center justify-between gap-4 px-8 bg-white">
        {BottomAppBarItems.map((item: BottomAppBarItem) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return <Link href={item.href} key={item.key} className="flex flex-col items-center justify-center gap-2 pt-3 pb-2" style={{borderTop: isActive ? "2px solid #f37608" : "none"}}>
                <Icon color={isActive ? "#f37608" : "#777a81"} size={22} />
                <div className={`text-xs ${isActive ? "text-amber-600 font-semibold" : "text-[#777a81]"}`}>{item.label}</div>
            </Link>
        })}
    </div>
}