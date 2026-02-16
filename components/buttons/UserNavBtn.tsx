"use client"

import { content } from "@/config/content";
import { routes } from "@/lib/routeNames";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { TbUser } from "react-icons/tb";

export default function UserNavBtn() {
    const router = useRouter()
    function handleRouteTo() {
        router.push(routes.PROFILE)
    }
    // return <Dropdown>
    //     <DropdownTrigger>
    return <Button
        onPress={handleRouteTo}
        variant="light"
        size="sm"
        className="text-xs font-semibold"
        isIconOnly
        startContent={<TbUser size={24} />}
    />
    {/* </DropdownTrigger>
        <DropdownMenu variant="faded" className="text-sm">
            <DropdownItem key="profile">
                {content.profile}
            </DropdownItem>
            <DropdownItem key="addresses">
                {content.myAddresses}
            </DropdownItem>
            <DropdownItem key="myOrders">
                {content.myOrders}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown> */}
}