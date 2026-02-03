"use client";

import { content } from "@/config/content";
import { Chip } from "@heroui/chip";
import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
  className?: string;
  cats: { id: number; title: string }[]; // pass all categories
}

export default function FilterChips({ className, cats }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const chips: { key: string; label: string }[] = [];

  // 🟢 Categories: one chip per selected category
  const categoryIds = searchParams.get("categoryIds");
  if (categoryIds) {
    const ids = categoryIds.split(",").map(Number).filter(Boolean);
    ids.forEach(id => {
      const cat = cats.find(c => c.id === id);
      if (cat) {
        chips.push({
          key: `category-${id}`,
          label: cat.title,
        });
      }
    });
  }

  // 🟢 Stock
  if (searchParams.get("isAvailableOnly") === "true") {
    chips.push({
      key: "isAvailableOnly",
      label: content.availableProductsOnly,
    });
  }

  // 🟢 Search
  const search = searchParams.get("search");
  if (search) {
    chips.push({
      key: "search",
      label: `Search: "${search}"`,
    });
  }

  // 🟢 Price
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    chips.push({
      key: "price",
      label: `Price`,
    });
  }

  function removeFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (key.startsWith("category-")) {
      const idToRemove = key.replace("category-", "");
      const remaining = (searchParams.get("categoryIds") ?? "")
        .split(",")
        .filter(id => id !== idToRemove);
      if (remaining.length) {
        params.set("categoryIds", remaining.join(","));
      } else {
        params.delete("categoryIds");
      }
    } else {
      switch (key) {
        case "isAvailableOnly":
          params.delete("isAvailableOnly");
          break;
        case "search":
          params.delete("search");
          break;
        case "price":
          params.delete("minPrice");
          params.delete("maxPrice");
          break;
      }
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  if (chips.length === 0) return null;

  return (
    <div className={`flex flex-col md:flex-row gap-3 ${className}`}>
      <div className="hidden md:block">نتیجه جستجو: </div>

      <div className="flex flex-wrap gap-2">
        {chips.map(chip => (
          <Chip
            size="sm"
            key={chip.key}
            variant="bordered"
            onClose={() => removeFilter(chip.key)}
          >
            {chip.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
