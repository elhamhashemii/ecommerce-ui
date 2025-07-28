import { TbBrandInstagram, TbBrandTelegram, TbBrandWhatsapp, TbPhoneCall } from "react-icons/tb";
import { content } from "./content";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "E-commerce UI",
  shopName: "نوشت افزار 124",
  description: "Awesome Client App to Buy whatever you want!",
  navItems: [
    {
      label: content.home,
      href: "/",
    },
    {
      label: content.shop,
      href: "/shop",
    },
    {
      label: content.blog,
      href: "/blog",
    },
    {
      label: content.about,
      href: "/about",
    },
    {
      label: content.contact,
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: content.home,
      href: "/",
    },
    {
      label: content.profile,
      href: "/profile",
    },
    {
      label: content.shop,
      href: "/shop",
    },
    {
      label: content.blog,
      href: "/blog",
    },
    {
      label: content.about,
      href: "/about",
    },
    {
      label: content.contact,
      href: "/contact",
    },
    {
      label: content.logout,
      href: "/logout",
    },
  ],
  links: {
    developer: "https://elhamhashemi.dev",
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
  socials: [
    { key: 0, label: "instagram", icon: <TbBrandInstagram size={24} />, href: "" },
    { key: 1, label: "telegram", icon: <TbBrandTelegram size={24} />, href: "" },
    { key: 2, label: "whatsapp", icon: <TbBrandWhatsapp size={24} />, href: "" },
    { key: 3, label: "phone", icon: <TbPhoneCall size={24} />, href: "" },
    // { key: 3, label: "rubika", icon: <TbBrandInstagram />, href: "" },
  ]
};
