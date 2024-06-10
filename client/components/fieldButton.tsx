import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FieldButtonProps {
    icon: LucideIcon;
    title: string;
    quantity: number;
}

const FieldButton: React.FC<FieldButtonProps> = ({ icon: Icon, title, quantity }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const projectParam = searchParams.get('project');
        setIsSelected(projectParam === title);
        console.log(projectParam)
    }, [searchParams, title]);

    const handleButtonClick = () => {
        const currentSearchParams = new URLSearchParams(pathname.split('?')[1]); // Get existing search params
        currentSearchParams.set('project', title); // Set 'field' parameter to title
        const newSearch = currentSearchParams.toString();
        const newUrl = `${pathname.split('?')[0]}?${newSearch}`; // Replacing the entire query string
        router.replace(newUrl);
    };

    return (
        <Button
            onClick={handleButtonClick}
            className={cn("flex items-center w-full justify-center group-hover:justify-start",
                isSelected ? "bg-blue-600/90 text-white hover:bg-blue-700/80" : "bg-white/90 text-slate-500 hover:bg-slate-100")
            }
        >
            <span className="text-md group-hover:hidden block">
                {title[0]}
            </span>
            <span className="text-md group-hover:block hidden">
                {title}
            </span>
        </Button>
    );
};

export default FieldButton;
