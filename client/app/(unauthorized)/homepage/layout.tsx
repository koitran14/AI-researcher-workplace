"use client"

import NavBar from "@/components/navbar"
import Transition from "@/components/transition"
import useAuthToken from "@/hooks/useAuthToken"
import { redirect, useRouter } from "next/navigation"

export default function UnAuthLayout({
    children
}: {
    children: React.ReactNode
}) {

    return(
        <div className="relative md:p-4 p-2 w-full h-full flex flex-col">
            <NavBar/>
            <div className="md:mt-24 mt-28 w-full h-full">
                <Transition>
                    {children}
                </Transition>
            </div>
        </div>
    )
}