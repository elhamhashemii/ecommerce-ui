"use client"

import { deleteAddressById, getMe, getUserAddresses, getUserOrders, logout, updateAddressById } from "@/actions/client/clientActions"
import { useUser } from "@/context/user"
import { routes } from "@/lib/routeNames"
import { Card } from "@heroui/card"
import { useRouter } from "next/navigation"
import { Key, useEffect, useState } from "react"
import { Tabs, Tab } from "@heroui/tabs";
import { Spinner } from "@heroui/spinner";
import { content } from "@/config/content"
import { Input } from "@heroui/input"
import { Divider } from "@heroui/divider"
import { AddressType } from "@/components/lists/MyAddresses"
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@heroui/button"
import { TbDotsVertical, TbEdit, TbTrash } from "react-icons/tb"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal"
import AddressForm from "@/components/forms/AddressForm"
import { toast } from "react-toastify"

export function LoadingProfile() {
    return <Card shadow="sm" radius="sm" className="p-8">
        <Spinner />
    </Card>
}


export default function ProfilePage() {
    const { setUser } = useUser()
    const router = useRouter()
    const { onOpen, onOpenChange, isOpen } = useDisclosure()
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUserData] = useState<any>()
    const [userAddresses, setUserAddresses] = useState<any>()
    const [userOrders, setUserOrders] = useState<any>()
    const [selectedAddress, setSelectedAddress] = useState<any>()
    const [selectedTab, setSelectedTab] = useState<any>("profile");

    async function getUser() {
        try {
            setLoading(true)
            const response: any = await getMe()
            if (response) {
                setUserData(response)
                setUser(response)
                localStorage.setItem("user", JSON.stringify(response))
                // setProfileCompletenessValue(calculateCompletionPercentage(response))
            }
        } catch (err) {
            logout()
            localStorage.removeItem("user")
            router.push(routes.LOGIN)
        } finally {
            setLoading(false)
        }
    }

    async function getAddresses() {
        setLoading(true)
        try {
            const res = await getUserAddresses(router)
            setUserAddresses(res)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    async function getOrders() {
        setLoading(true)
        try {
            const res = await getUserOrders(router)
            setUserOrders(res)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    async function onAction(key: Key, item: AddressType) {
        console.log({ item })
        setSelectedAddress(item)
        if (key == "delete") {
            // call delete API and then refetch the address list
            setLoading(true)
            try {
                const res = await deleteAddressById(Number(item?.id), router)
                if (res) {
                    getAddresses()
                    toast.success(<div className="text-sm">{content.deletedSuccessfully}</div>)
                }
            } catch (err: any) {
                toast.error(err?.data?.message || "Something went wrong!")
            } finally {
                setLoading(false)
            }
        } else {
            onOpen()
        }
    }

    async function updateAddress(data: AddressType, onClose: () => void) {
        setLoading(true)
        try {
            const res = await updateAddressById(data, Number(selectedAddress?.id), router)
            if (res) {
                onClose()
                getAddresses()
                toast.success(<div className="text-sm">{content.updatedSuccessfully}</div>)
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong!")
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        // getUser()
        switch (selectedTab) {
            case "profile":
                getUser()
                break;
            case "addresses":
                getAddresses()
                break;
            case "orders":
                getOrders()
                break;
            default:
                getUser()
                break;
        }
    }, [selectedTab])

    return <div className="flex flex-col">
        <Tabs fullWidth size="sm" selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
            <Tab key="profile" title={content.profile}>
                {loading ? <LoadingProfile /> :
                    <Card shadow="sm" radius="sm" className="p-4 flex flex-col gap-4">
                        <Input size="sm" labelPlacement="outside" readOnly value={user?.fullName} label={content.fullName} />
                        <Input size="sm" labelPlacement="outside" readOnly value={user?.phoneNumber || "-"} label={content.phoneNumber} />
                    </Card>
                }
            </Tab>
            <Tab key="addresses" title={content.myAddresses}>
                {loading ? <LoadingProfile /> :
                    <Card shadow="sm" radius="sm" className="p-4 flex flex-col gap-2">
                        {userAddresses && userAddresses.length && userAddresses?.length > 0 &&
                            userAddresses.map((item: AddressType, index: number) => {
                                return <ul className="text-sm w-full" key={item?.id}>
                                    <li className="w-full">
                                        <div className="w-full font-semibold flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <FaLocationDot size={16} color="#f37608" />
                                                {item?.title}
                                            </div>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button variant="light" isIconOnly radius="full" startContent={<TbDotsVertical size={16} />} />
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Static Actions" onAction={(key) => onAction(key, item)}>
                                                    <DropdownItem startContent={<TbEdit />} key="edit">{content.edit}</DropdownItem>
                                                    <DropdownItem color="danger" startContent={<TbTrash />} key="delete">{content.delete}</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                        <div className="text-gray-400 pr-2 text-xs mt-2">{item?.postalCode}</div>
                                        <div className="text-gray-400 pr-2 text-xs">{item?.address}</div>
                                        {index + 1 !== userAddresses.length && <Divider className="mt-4" />}
                                    </li>
                                </ul>
                            })}
                    </Card>
                }

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (<>
                            <ModalHeader>{content.edit}</ModalHeader>
                            <ModalBody className="text-sm">
                                <AddressForm init={selectedAddress} isLoading={loading} onSubmit={(data) => updateAddress(data, onClose)} />
                            </ModalBody>
                        </>
                        )}
                    </ModalContent>
                </Modal>
            </Tab>
            <Tab key="orders" title={content.myOrders}>
                <Card shadow="sm" radius="sm" className="p-4 flex flex-col gap-4">
                    {userOrders && userOrders.length && userOrders?.length > 0 &&
                        userOrders.map((item: any, index: number) => {
                            return <ul className="text-sm" key={item?.id}>
                                <li>
                                    {item?.id}
                                    {/* <div className="font-semibold">• {item?.title}</div>
                                    <div className="text-gray-400 pr-2 text-xs mt-2">{item?.postalCode}</div>
                                    <div className="text-gray-400 pr-2 text-xs">{item?.address}</div> */}
                                    {index + 1 !== userOrders.length && <Divider className="mt-4" />}
                                </li>
                            </ul>
                        })}
                </Card>
            </Tab>
        </Tabs>
    </div>
}