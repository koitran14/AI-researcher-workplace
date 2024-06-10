import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const Loading = ({
    className
}: {
    className: string
}) => {
    return (
        <Loader className={cn("animate-spin", className)}/>
    );
}
 
export default Loading;