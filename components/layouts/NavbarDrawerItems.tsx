import { siteConfig } from "@/config/site";
import { NavbarMenuItem } from "@heroui/navbar";
import Link from "next/link";

export default function NavbarDrawerItems() {
    return <div className="mx-4 mt-2 flex flex-col gap-2">
    {siteConfig.navMenuItems.map((item, index) => (
      <NavbarMenuItem key={`${item}-${index}`}>
        <Link
          color={
             index === siteConfig.navMenuItems.length - 1
                ? "danger"
                : "foreground"
          }
          href={item.href}
        >
          {item.label}
        </Link>
      </NavbarMenuItem>
    ))}
  </div>
}