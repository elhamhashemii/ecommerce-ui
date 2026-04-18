import { fetchBlogById } from "@/actions/server/serverActions";
import { BlogCategory } from "@/types/blog";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs"

export default async function SingleBlogPage({ params }: { params: { id: string } }) {

    const blog = await fetchBlogById(params.id) as any;
    const { title, intro, categories, id, imageUrls } = blog;
    const hasImage = imageUrls && imageUrls.length > 0;
    const img = hasImage ? `https://${imageUrls[0]}` : "";

    return <>
        <div className="py-10 flex flex-col gap-6 md:gap-10">
            <div className="text-lg font-semibold"><span className="text-success pl-2 animate-pulse">●</span>{blog?.title}</div>
            <div className="flex flex-wrap gap-1">
                {categories.map((cat: BlogCategory) => {
                    return <Chip radius="sm" variant="faded" size="sm" className="text-xs">{cat?.title}</Chip>
                })}
            </div>
            <div className="text-sm">{blog?.intro}</div>
            <Image
                src={img}
                alt="product"
                width={200}
                height={200}
                className="mx-auto rounded-xl h-full w-full object-cover"
            />
            <div className="text-sm">{blog?.content}</div>
            <div className="text-xs text-gray-400">تاریخ پست: {new Date(blog?.createdAt).toLocaleDateString("fa-IR")}</div>

        </div>
    </>
}