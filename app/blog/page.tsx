import { fetchBlogs } from "@/actions/server/serverActions";
import BlogSlider from "@/components/sliders/BlogSlider";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function ShopPage() {
    const blogs = await fetchBlogs() as any;

    return <div>
        {/* <SampleSlider /> */}
        <div
            style={{
                backgroundImage: 'url(https://reverent-villani-cefcuyj0.storage.c2.liara.space/adda.webp)',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
            className="bg-bottom relative w-full my-8 bg-gray-100 p-4 rounded-xl text-white min-h-82 flex items-end md:items-center justify-end"
        >
        </div>
        <div className="text-xl font-bold">جدیدترین مقالات</div>
        <div className="my-8">
            <BlogSlider data={blogs} />
        </div>
    </div>
}