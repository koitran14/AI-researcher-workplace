"use client"

import Transition from "@/components/transition";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter()

    return (
        <Transition>
            <main className=" w-full h-full flex flex-col">
                <div className="bg-gradient-to-r from-orange-200 via-white to-red-200 w-full h-full rounded-md py-5 px-8 md:px-24 flex sm:flex-row flex-col gap-2 items-center justify-between">
                    <div className="flex flex-col gap-y-2 w-[50%]">
                    <h1 className="text-4xl">
                        <p className="text-bold text-orange-600 text-5xl text-justify">ReArcher,</p>
                        where innovation thrives and collaboration fuels discovery
                    </h1>
                    <p className="text-sm text-slate-500 text-justify">
                        Our mission is to provide a dynamic environment that fosters groundbreaking 
                        research and cultivates the intellectual curiosity of our community. 
                        Here, researchers from diverse fields come together to share ideas, explore new frontiers, and turn visionary concepts into reality. Join us in shaping the future through knowledge, discovery, and a shared passion for excellence.
                    </p>
                    <Button className="mt-6 bg-orange-500 hover:bg-orange-600"
                        onClick={() => router.push('/sign-in')}
                    >
                        Explore
                    </Button>
                    </div>
                    <Image
                        alt="intro"
                        src={'/intro.svg'}
                        width={500}
                        height={500}
                        className="w-80 h-80 md:h-[500px] md:w-[500px] object-cover flex-shrink-0"
                    />
                </div>
            </main>
        </Transition>
    );
}
