import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";

export default function BlogCard() {
    return <Card shadow="sm">
        <CardBody>
            <Image src="" alt="blog-title"  />
        </CardBody>
        <CardFooter>
            <div>Category</div>
            <div>title</div>
            <div>intro</div>
            <div>read more</div>
        </CardFooter>
    </Card>
}