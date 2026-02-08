"use client"

import { getMe, logout } from "@/actions/client/clientActions"
import { useUser } from "@/context/user"
import { routes } from "@/lib/routeNames"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage() {
    const { setUser } = useUser()
    const [user, setUserData] = useState<any>()
    const router = useRouter()

    async function getUser() {
        try {
            const response: any = await getMe()
            if (response) {
                console.log({ response })
                setUserData(response)
                setUser(response)
                localStorage.setItem("user", JSON.stringify(response))
                // setProfileCompletenessValue(calculateCompletionPercentage(response))
            }
        } catch (err) {
            logout()
            localStorage.removeItem("user")
            router.push(routes.LOGIN)
        }
    }


    useEffect(() => {
        getUser()
    }, [])

    return <div>
        Profile
    </div>
}