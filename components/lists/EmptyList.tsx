import { content } from "@/config/content";

export default function EmptyList() {
    return <div className="my-4 md:my-8">
        {content.nodata}
    </div>
}