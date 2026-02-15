"use client"

import { attachOrderShippingInfo, createAddress, getOrderById, getUserAddresses } from "@/actions/client/clientActions";
import OrderItems from "@/components/cards/OrderItems";
import AddressForm from "@/components/forms/AddressForm";
import ShippingMethodRadioBtns from "@/components/buttons/ShippingMethodRadioButtons";
import MyAddresses, { AddressType } from "@/components/lists/MyAddresses";
import { content } from "@/config/content";
import { OrderStatusColors, OrderStatusFa } from "@/types";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import OrderDetails from "@/components/cards/OrderDetails";
import { routes } from "@/lib/routeNames";


export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const [activeKey, setActiveKey] = useState<string | Set<string>>("0");
    const [currentOrder, setCurrentOrder] = useState<any>()
    const [myAddresses, setMyAddresses] = useState<any>()
    const [formIsVisible, setFormIsVisible] = useState(false)
    const [finalizedAddress, setFinalizedAddress] = useState<any>(undefined)
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<any>(undefined);
    const [totalPayable, setTotalPayable] = useState(0)

    const router = useRouter()

    function showForm() {
        setFormIsVisible(true)
    }

    async function getCurrentOrder() {
        if (orderId) {
            try {
                const res = await getOrderById(+orderId, router) as any;
                const label = OrderStatusFa[res?.status.toUpperCase() as keyof typeof OrderStatusFa];
                const color = OrderStatusColors[res?.status.toUpperCase() as keyof typeof OrderStatusColors];
                const result = { ...res, status: { label, color } }
                setCurrentOrder(result)
            } catch (err) { } finally { }
        } else {
            // TODO: redirect to orders page
            router.push(routes.PROFILE)
        }
    }

    async function getMyAddresses() {
        try {
            const res = await getUserAddresses(router) as any;
            setMyAddresses(res)
        } catch (err) { } finally { }

    }

    async function handleCreate(data: any) {
        console.log({ data })
        try {
            const res = await createAddress(data, router)
            console.log({ res })
            if (res) {
                setFormIsVisible(false)
                getMyAddresses()
            }
        } catch (err) { } finally { }
    }

    async function handleFinalizeAddress(data: AddressType) {
        setFinalizedAddress(data)
        // call api to attach address and shipping method to the order
        try {
            const res = await attachOrderShippingInfo(currentOrder.id, Number(data?.id), selectedShippingMethod, router) as any
            if (res) {
                setActiveKey("3")
                setTotalPayable(res?.totalPayable)
            }
        } catch (err) {

        } finally {

        }

    }

    function handleSelectShippingMethod(value: string) {
        setSelectedShippingMethod(value)
        setActiveKey("2")
    }

    useEffect(() => {
        getCurrentOrder()
        getMyAddresses()
    }, [])

    return <>
        <div className="px-2 w-full flex justify-between items-center">
            <div className="font-semibold mb-4 cursor-pointer">{content.checkout}</div>
            <Chip variant="dot" size="sm" radius="sm" color={currentOrder?.status?.color}>{currentOrder?.status?.label}</Chip>
        </div>
        <Accordion
            variant="splitted"
            selectedKeys={activeKey}
            // @ts-ignore
            onSelectionChange={setActiveKey}
        >
            <AccordionItem indicator={<FaCircleCheck color="green" />} disableIndicatorAnimation key="0" title="اقلام سفارش">
                <OrderItems data={currentOrder} />
            </AccordionItem>

            <AccordionItem key="1" title={content.selectShippingMethod}
                disableIndicatorAnimation={selectedShippingMethod}
                indicator={selectedShippingMethod && <FaCircleCheck color="green" />}
            >
                <ShippingMethodRadioBtns selected={selectedShippingMethod} onSelect={handleSelectShippingMethod} />
            </AccordionItem>


            <AccordionItem key="2" title={content.chooseAddress}
                disableIndicatorAnimation={finalizedAddress}
                indicator={finalizedAddress && <FaCircleCheck color="green" />}
            >
                <MyAddresses data={myAddresses} onFinalize={handleFinalizeAddress} />
                {formIsVisible ?
                    <AddressForm onSubmit={handleCreate} /> :
                    <Button onPress={showForm} className="w-full mb-2" variant="bordered">{content.addNewAddress}</Button>
                }
            </AccordionItem>

        </Accordion>
        {selectedShippingMethod && <div className="my-4 mx-2">
            <OrderDetails
                details={
                    {
                        orderItems: currentOrder,
                        shippingMethod: selectedShippingMethod,
                        address: finalizedAddress,
                        totalPayable: totalPayable
                    }}
            />
        </div>}
    </>
}