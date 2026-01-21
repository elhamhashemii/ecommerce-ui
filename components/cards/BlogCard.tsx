import { BlogType } from "@/types/blog";
import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";

interface IProps {
    blog: BlogType
}

export default function BlogCard(props: IProps) {
    const { blog } = props;
    const { title, intro, category, id, img } = blog;
    return <Card shadow="sm">
        <CardBody>
            <Image src={img} alt={title} width={100} height={100} />
        </CardBody>
        <CardFooter>
            <div>{category}</div>
            <div>{title}</div>
            <div>{intro}</div>
            <div>link with id: {id}</div>
        </CardFooter>
    </Card>
}