import { content } from "@/config/content";

export default function AboutPage() {
    return <div>
        <div
            style={{
                backgroundImage: 'url(https://reverent-villani-cefcuyj0.storage.c2.liara.space/blog-banner.jpg)',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
            className="bg-center relative w-full my-8 bg-gray-100 p-4 rounded-xl text-white min-h-82 flex items-end md:items-center justify-end"
        >
        </div>
        <div className="font-bold mb-4 text-lg">{content.about}</div>
        <div className="flex flex-col md:flex-row w-full items-start justify-between px-0 md:px-4 gap-8">
            <div className="text-sm w-full md:basis-1/2 flex flex-col gap-2 md:gap-4">
                <p>
                    <span className="px-2"></span>
                    فروشگاه ما بیش از ۲۰ سال است که در خدمت شما عزیزان بوده و در این مدت همواره تلاش کرده‌ایم تا بهترین محصولات و خدمات را ارائه دهیم. این فروشگاه از ابتدا با عشق و علاقه خانواده ما شکل گرفت و امروز با تجربه‌ای دو دهه‌ای، همچنان با همان اشتیاق و صداقت به فعالیت خود ادامه می‌دهد.
                </p>
                <p>
                    <span className="px-2"></span>
                    هدف ما همیشه ایجاد محیطی مطمئن و دوستانه برای مشتریانمان بوده است، جایی که شما بتوانید با آرامش خرید کنید و از کیفیت محصولات مطمئن باشید. هر محصولی که عرضه می‌کنیم، حاصل دقت، تجربه و توجه به نیازهای شماست.
                </p>

                <p>
                    <span className="px-2"></span>
                    ما باور داریم که اعتماد مشتریان، سرمایه واقعی ماست. به همین دلیل همیشه سعی کرده‌ایم با ارائه خدمات صادقانه و پاسخگویی به نیازهای شما، این اعتماد را حفظ کنیم. از همراهی شما در این مسیر سپاسگزاریم و امیدواریم بتوانیم همچنان همراه شما در خریدهایی مطمئن و رضایت‌بخش باشیم.
                </p>
            </div>
            <div className="w-full md:basis-1/2 bg-gray-100 rounded-xl p-12">Gallery here</div>
        </div>

    </div>
}