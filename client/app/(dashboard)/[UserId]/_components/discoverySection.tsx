"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Expert {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    bio: string
}

interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}

const DiscoverySection = () => {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter()
    const pathname = usePathname();

    useEffect(() => {
        const fakeExperts: Expert[] = [
            { id: 1, name: "Jane Doe", title: "AI Researcher", imageUrl: "/blank-avatar.webp", bio: "I am currently working on..." },
            { id: 2, name: "John Smith", title: "Data Scientist", imageUrl: "/blank-avatar.webp", bio: "I am currently working on..." },
        ];

        const fakeProjects: Project[] = [
            { id: 1, name: "Project Alpha", description: "AI-based project", imageUrl: "/blank-thumbnail.png" },
            { id: 2, name: "Project Beta", description: "Data analysis project", imageUrl: "/blank-thumbnail.png" },
        ];

        setExperts(fakeExperts);
        setProjects(fakeProjects);
    }, []);

    return (
        <div className="flex flex-col gap-12 p-6">
            <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Relevant Experts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {experts.map((expert) => (
                        <Button onClick={() => router.push(pathname + `/experts/${expert.id}`)} key={expert.id} 
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center w-full h-full
                            hover:bg-orange-100 
                        ">
                            <div className="relative w-24 h-24 mb-4">
                                <Image
                                    src={expert.imageUrl}
                                    alt={expert.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">{expert.name}</h3>
                            <p className="text-gray-500">{expert.title}</p>
                            <p className="text-slate-400 text-xs mt-2">{expert.bio}</p>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Relevant Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <Button onClick={() => router.push(pathname + `/projects/${project.id}`)} key={project.id} 
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center w-full h-full
                             hover:bg-orange-100 
                        ">
                            <div className="relative w-full h-32 mb-4">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700">{project.name}</h3>
                            <p className="text-gray-500">{project.description}</p>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiscoverySection;
