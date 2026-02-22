import { Card } from "@heroui/card";
import { CategoryItem } from "../forms/inputs/CategoriesCheckbox";
import { content } from "@/config/content";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesList({ data }: { data: any }) {
    console.log(data);
    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <h2 className="font-bold">دسته‌بندی محصولات</h2>
            <div className="flex gap-2 md:gap-4 flex-wrap my-4">
                {data.map((category: CategoryItem) => (
                    <Link href={`/shop?categoryIds=${category.id}`} key={category.id}>
                        <Card key={category.id} className="group hover:shadow-lg p-4 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-2" shadow="none">
                            {category?.icon && <Image src={category?.icon} alt={category?.title} width={40} height={40} className="w-12 h-12" />}
                            <div className="text-sm font-semibold group-hover:text-primary">{category.title}</div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}