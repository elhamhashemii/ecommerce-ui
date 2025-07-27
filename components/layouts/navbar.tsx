import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { RiSearch2Line } from "react-icons/ri";
import { siteConfig } from "@/config/site";
import { content } from "@/config/const";
import { Button } from "@heroui/button";
  import CartButton from "../buttons/CartButton";


export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder={content.search + "..."}
      startContent={
        <RiSearch2Line />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/3 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">{siteConfig.shopName}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex justify-end basis-1/4 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex basis-4/6">{searchInput}</NavbarItem>
        <NavbarItem className="hidden lg:block">
          <Button variant="bordered" size="sm" color="primary" className="text-xs font-semibold">{content.login} / {content.signup}</Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:block">
          <CartButton />
        </NavbarItem>
      </NavbarContent>


      {/* Mobile Drawer Button */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Drawer Menu */}
      <NavbarMenu className="bg-white">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                   index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="md"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
