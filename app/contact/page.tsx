import FAQsAccordion from "@/components/lists/FaqsAccordion";
import { content } from "@/config/content";
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";
import SocialMediaSection from "@/components/lists/SocialMediaSection";
import ContactUsSection from "@/components/forms/ContactUsForm";

export default function ShopPage() {

    return <div>
        <div className="w-full my-8 bg-danger p-4 rounded-md text-white min-h-64">Hero Banner for Contact Us Page</div>
        <div className="w-full flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between gap-4">
            <div className="w-full md:basis-1/2">
                <div>
                    <div className="font-bold mb-4 px-2">{content.faqs}</div>
                    <FAQsAccordion />
                </div>
                <div className="my-8 md:my-0">
                    <div className="font-bold my-4 md:mt-8 px-2">{content.contactWays}</div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap px-4 gap-1 text-sm">
                            <div className="flex items-center justify-start gap-1">
                                <HiLocationMarker size={20} />
                                <span className="font-bold">{content.address}:</span>
                            </div>
                            <div className="px-2 md:px-0">تهران٬ شهرری٬ خیابان فداییان اسلام٬ خیابان سرگرد محمدی٬ پلاک ۲۴۰</div>
                        </div>

                        <div className="text-sm px-4 flex items-center justify-start gap-1">
                            <BiSolidPhoneCall size={20} />
                            <span className="font-bold">شماره تماس:</span>
                            <span className="rtl">02133374288</span>
                        </div>

                        <div className="text-sm px-4 flex items-center justify-start gap-1">
                            <FaShop size={18} />
                            <span className="font-bold">ساعات کاری:</span>
                            <span className="rtl">همه روزه ۸ صبح تا ۹ شب</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:basis-1/2">
                <div className="font-bold mb-4 px-2">{content.contactUS}</div>
                <ContactUsSection />
            </div>
        </div>
        <div className="w-full bg-blue-100 mt-4 md:mt-12">
            <iframe
                className="w-full rounded-md"
                src="https://neshan.org/maps/iframe/places/270e0c8e8c2a795fc5c7f4c7e3811935#c35.610-51.445-19z-0p/35.610021700000004/51.4443997"
                title="map-iframe"
                // width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                style={{ borderRadius: "12px" }}
            ></iframe>
        </div>
        <div className="w-full mt-4 md:mt-12">
            <SocialMediaSection />
        </div>
    </div>
}