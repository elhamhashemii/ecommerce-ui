export default function ShopPage() {
    return <div>
        <div className="w-full flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between gap-4">
        <div className="w-full md:basis-1/2 bg-green-200">
            <div>Faqs</div>
            <div>Address and information</div>
        </div>
        <div className="w-full md:basis-1/2 bg-gray-200">contact form</div>
    </div>
    <div className="w-full bg-blue-100 mt-4">map</div>
    </div>
}