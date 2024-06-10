"use client"

import Loading from "@/components/loading";
import useAuthToken from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";


export default function Home() {
    const {token} = useAuthToken();
    const router = useRouter();

    if (!token)
        router.push('/homepage');
    else router.push('/1')

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Loading className="w-10 h-10 text-white animate-spin"/>
        </div>
    );
}
