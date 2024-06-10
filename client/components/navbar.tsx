"use client"

import { Dna } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";

export default function NavBar(){
    const router = useRouter();
    return(
        <div className="absolute p-2 z-10 top-0 left-0 w-full h-28 md:p-4">
            <div className="bg-neutral-100 shadow-sm w-full h-full rounded-lg flex flex-row items-center justify-between px-5 md:px-12">
                <div className="flex flex-row gap-x-2 items-center">
                    <Dna className="text-black h-8 w-8"/>
                    <h1 className="text-orange-600 font-semibold">ReArcher</h1>
                </div>
                <div className="flex flex-row gap-x-2">
                    <Button onClick={() => router.push('/sign-in')} variant="outline" className="bg-transparent border border-black hover:bg-orange-600 hover:text-white transition duration-150">Login</Button>
                </div>
            </div>
        </div>
    )
}