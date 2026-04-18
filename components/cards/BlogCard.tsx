import { content } from "@/config/content";
import { routes } from "@/lib/routeNames";
import { BlogCategory, BlogItem } from "@/types/blog";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
    blog: BlogItem;
}

export default function BlogCard(props: IProps) {
    const { blog } = props;
    const { title, intro, categories, id, imageUrls } = blog;
    const router = useRouter()


    const hasImage = imageUrls && imageUrls.length > 0;
    const img = hasImage ? `https://${imageUrls[0]}` : "";

    function handleNavigate() {
        router.push(`${routes.NEWS}/${id}`)
    }

    return <Card shadow="sm" className="w-52">
        <CardBody className="text-right">
            <Image
                src={img}
                alt="product"
                width={200}
                height={200}
                className="mx-auto rounded-[8px] h-full w-44 object-cover"
            />
            <div className="text-xs font-semibold my-2">{title}</div>
            <div className="text-gray-400 text-xs line-clamp-3">{intro}</div>
            {/* <div className="my-2 flex flex-wrap gap-1">
                {categories.map((cat: BlogCategory) => {
                    return <Chip radius="sm" variant="faded" size="sm" className="text-xs">{cat?.title}</Chip>
                })}
            </div> */}
            <Button className="mt-2" size="sm" color="success" variant="flat" onPress={handleNavigate}>{content.readmore}</Button>
        </CardBody>
    </Card>
}