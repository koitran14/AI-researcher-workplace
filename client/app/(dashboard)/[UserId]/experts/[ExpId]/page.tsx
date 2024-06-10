"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Home, Link } from "lucide-react";
import { useParams } from "next/navigation";

interface ResearchArticle {
    id: number;
    title: string;
    link: string;
}

interface IndustrialActivity {
    id: number;
    title: string;
    description: string;
}

interface Expert {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    linkedinUrl: string;
    researchArticles: ResearchArticle[];
    industrialActivities: IndustrialActivity[];
}

const ExpertProfilePage = () => {
    const [expert, setExpert] = useState<Expert | null>(null);
    const router = useRouter();
    const { ExpId } = useParams();

    useEffect(() => {
        const fetchExpertData = async () => {
            const fakeExpert: Expert = {
                id: Number(ExpId),
                name: "Jane Doe",
                title: "AI Researcher",
                imageUrl: "/blank-avatar.webp",
                linkedinUrl: "https://www.linkedin.com/in/jane-doe",
                researchArticles: [
                    { id: 1, title: "Article 1 on AI", link: "https://example.com/article1" },
                    { id: 2, title: "Article 2 on AI", link: "https://example.com/article2" },
                ],
                industrialActivities: [
                    { id: 1, title: "Industry Project 1", description: "Description of industry project 1" },
                    { id: 2, title: "Industry Project 2", description: "Description of industry project 2" },
                ],
            };

            setExpert(fakeExpert);
        };

        if (ExpId) {
            fetchExpertData();
        }
    }, [ExpId]);

    if (!expert) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <div className="flex flex-row gap-x-1 items-center mb-5">
                    <a href="/">
                        <Home className='w-5 h-5 text-blue-500'/>
                    </a>
                    <ChevronRight className="w-5 h-5 mx-1 text-slate-500"/>
                        
                    <div className="flex items-center">
                        <span>{expert.name}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                        <Image
                            src={expert.imageUrl || '/blank-avatar.webp'}
                            alt={expert.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">{expert.name}</h1>
                    <p className="text-gray-500">{expert.title}</p>
                    <a
                        href={expert.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline mt-2"
                    >
                        <Link className="w-4 h-4 mr-1" />
                        LinkedIn Profile
                    </a>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Research Articles</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {expert.researchArticles.map((article) => (
                            <li key={article.id}>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {article.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Industrial Activities</h2>
                    <ul className="space-y-4">
                        {expert.industrialActivities.map((activity) => (
                            <li key={activity.id} className="p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-700">{activity.title}</h3>
                                <p className="text-gray-600">{activity.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExpertProfilePage;
