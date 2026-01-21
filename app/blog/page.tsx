import BlogSlider from "@/components/sliders/BlogSlider";
import SampleSlider from "@/components/sliders/SampleSlider";

export default function ShopPage() {
    return <div>
        <SampleSlider />
        <div className="my-8">
            <BlogSlider />
        </div>
    </div>
}