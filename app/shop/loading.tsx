// app/shop/loading.tsx
export default function ShopLoading() {
    return (
        <div className="animate-pulse">
            دریافت محصولات ...
            <div className="h-40 bg-gray-200 rounded mb-6" />

            <div className="flex gap-4">
                <div className="w-1/4 h-80 bg-gray-200 rounded" />

                <div className="w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-48 bg-gray-200 rounded"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
