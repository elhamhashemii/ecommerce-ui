"use client";

import { Pagination } from "@heroui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface ShopPaginationProps {
  page: number;
  totalPages: number;
}

export default function ShopPagination({ page, totalPages }: ShopPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      className="flex items-center justify-center py-8"
      dir="rtl"
      variant="bordered"
      page={page}
      total={totalPages}
      onChange={handleChange}
    />
  );
}
