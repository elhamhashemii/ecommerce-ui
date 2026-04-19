import { Spinner } from "@heroui/spinner";

export default function Loading() {
    return <div className="flex items-center justify-center w-full h-52">
        <Spinner variant="wave" color="primary"
            // @ts-ignore
            label={<div className="text-sm text-primary">درحال دریافت اطلاعات</div>} />
    </div>
}