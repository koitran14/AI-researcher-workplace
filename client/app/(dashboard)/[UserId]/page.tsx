"use client"

import FieldButton from "@/components/fieldButton";
import { Button } from "@/components/ui/button";
import { Compass, Dna, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Activity, Bell, Calendar, Settings, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProjectList from "./_components/projectList";
import { AvaDropdown } from "@/components/profile-dropdown";
import DiscoverySection from "./_components/discoverySection";
import { CreateProjectDialog } from "./_components/createProjectDialog";

interface DataItem {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    field: string;
}


const DashboardPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedField, setSelectedField] = useState<string | null>(null)

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const selection = searchParams.get('project') 
        setSelectedField(selection)
    },[searchParams])    

    const [filtered, setFiltered ] = useState<Project[]>()

    const testFields = [
        { icon: Activity, title: "Activity", quantity: 3 },
        { icon: Bell, title: "Notifications", quantity: 7 },
        { icon: Calendar, title: "Calendar", quantity: 0 },
        { icon: User, title: "Profile", quantity: 1 },
        { icon: Settings, title: "Settings", quantity: 0 }
    ];

    // Filter data based on search query
    useEffect(() => {
        const fakeProjects: Project[] = [
            { id: 1, name: "Project 1", field: "Activity" },
            { id: 2, name: "Project 2", field: "Activity" },
            { id: 3, name: "Project 3", field: "Notifications" },
            { id: 4, name: "Project 4", field: "Profile" },
            { id: 5, name: "Project 5", field: "Profile" },
            { id: 6, name: "Project 6", field: "Settings" },
            { id: 7, name: "Project 7", field: "Settings" },
            { id: 8, name: "Project 8", field: "Settings" },
        ];
        setFiltered(fakeProjects)
        const filteredData: Project[] = fakeProjects.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFiltered(filteredData)
    },[searchQuery])

    const handleDiscoveryClick = () => {
        router.replace(pathname);
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full ">
            <div className="w-full h-24 flex flex-row gap-x-10 items-center justify-between bg-white/80 rounded-xl px-8 py-4">
                <div className="flex flex-row gap-x-1 items-center">
                    <Dna className="h-8 w-8"/>
                    <h1>ReArcher</h1>
                </div>
                <div className="flex flex-row gap-x-4 items-center justify-center">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border rounded-2xl w-80 px-3 py-2 "
                    />
                    <AvaDropdown/>
                </div>
            </div>
            <div className="w-full h-full flex flex-row gap-x-4">
                <div className="w-14 flex flex-col h-full bg-slate-700/80 rounded-xl gap-y-1 p-2 group hover:w-40 transform-all transition-all duration-150">
                    <CreateProjectDialog />
                    <div className="my-2 w-full">
                        <div className="border-t border-t-slate-200/50"/>
                    </div>
                    <Button 
                        className="bg-slate-500 w-full h-10 p-0 flex items-center"
                        onClick={handleDiscoveryClick}
                    >
                        <p className="group-hover:block group-hover:mr-1 hidden">Discovery</p>
                        <Compass className="w-4 h-4"/>
                    </Button>
                    <div className="my-2 w-full">
                        <div className="border-t border-t-slate-200/50"/>
                    </div>
                    {testFields.map((field, index) => (
                        <div key={index}>
                            {field.quantity > 0 && (
                                <FieldButton icon={field.icon} title={field.title} quantity={field.quantity}/>
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-full h-full bg-neutral-100 rounded-xl p-4 overflow-y-scroll no-scrollbar">
                    {selectedField ? 
                        <ProjectList selectedField={selectedField}/>
                    :
                        <DiscoverySection/>
                    }
                    
                </div>
            </div>
        </div>
    );
}
 
export default DashboardPage;