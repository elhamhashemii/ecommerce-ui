import Image from "next/image";
import { TbPhotoOff } from "react-icons/tb";

interface IProps {
    className?: string;
    src?: string;
}

export default function ProductImage({ className, src }: IProps) {
    return <>
        {src ?
            <Image
                src={src}
                width={120}
                height={120}
                alt="product"
                className={`${className} w-24 h-24 object-cover rounded-[8px]`}
            />

            : <div className="w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                <TbPhotoOff size={60} />
            </div>}
    </>
}