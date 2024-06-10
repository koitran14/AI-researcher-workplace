"use client"

import Transition from "@/components/transition";
import useAuthToken from "@/hooks/useAuthToken";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { token } = useAuthToken()
    const router = useRouter()

    if (!token) 
        router.push('/')

    return (
        <div className="w-full h-full p-3">
            <div className="w-full h-full">
                <Transition>
                    {children}
                </Transition>
            </div>
        </div>
    );
}
 
export default DashboardLayout;