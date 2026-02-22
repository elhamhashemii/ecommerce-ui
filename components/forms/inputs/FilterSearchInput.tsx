"use client";

import { Input } from "@heroui/input";
import { TbSearch } from "react-icons/tb";
import { Spinner } from "@heroui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function FilterSearchInput({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";

  const [value, setValue] = useState(searchFromUrl);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setValue(searchFromUrl);
  }, [searchFromUrl]);

  function applySearch(val: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (val.trim()) {
      params.set("search", val.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  return (
    <Input
      aria-label="Search"
      placeholder="جستجو..."
      startContent={<TbSearch />}
      endContent={isPending ? <Spinner size="sm" /> : null}
      type="search"
      value={value}
      onValueChange={setValue}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          applySearch(value);
        }
      }}
      className={className}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
    />
  );
}