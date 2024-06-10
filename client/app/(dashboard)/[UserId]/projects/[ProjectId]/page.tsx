// pages/project/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
}

interface Attribute {
    id: number;
    title: string;
    content: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    report: string;
    goal: string;
    purposes: string;
    participants: User[];
    attributes: Attribute[];
}

export default function ProjectPage() {
    const project: Project = {
        id: 1,
        title: "Sample Project",
        description: "This is a sample project description.",
        thumbnail: "/blank-thumbnail.png",
        report: "Sample report content",
        goal: "Sample project goal",
        purposes: "Sample project purposes",
        participants: [
            {
                id: 1,
                username: "john_doe",
                firstName: "John",
                lastName: "Doe",
                avatar: "/blank-avatar.webp",
                bio: "Sample bio for John Doe"
            },
            {
                id: 2,
                username: "jane_smith",
                firstName: "Jane",
                lastName: "Smith",
                avatar: "/blank-avatar.webp",
                bio: "Sample bio for Jane Smith"
            },
            {
                id: 3,
                username: "Kana",
                firstName: "Kana",
                lastName: "Anamie",
                avatar: "/blank-avatar.webp",
                bio: "Sample bio for Jane Smith"
            },
        ],
        attributes: [
            {
                id: 1,
                title: "Attribute 1",
                content: "Attribute 1 content"
            },
            {
                id: 2,
                title: "Attribute 2",
                content: "Attribute 2 content"
            }
        ]
    };
    
    return (
        <div className="container mx-auto p-6 md:px-[300px] md:py-6">
            <div className="bg-white shadow-lg rounded-lg p-6 md:px-16 py-8 flex flex-col w-full gap-y-4">
                <nav className="text-gray-500 mb-4">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link href="/">
                                <Home className='w-5 h-5 text-blue-500'/>
                            </Link>
                            <ChevronRight className="w-5 h-5 mx-1 text-slate-500"/>
                        </li>
                        <li className="flex items-center">
                            <span>{project.title}</span>
                        </li>
                    </ol>
                </nav>
                <div className="mb-4 w-full h-52">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="rounded-lg object-cover w-full h-full"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                    <div className='pl-6 border-l-4'>
                        <p className="text-gray-700 mb-4">{project.description}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Goal</h2>
                    <div className='w-full border-t mb-2'/>
                    <p className="text-gray-700">{project.goal}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Purposes</h2>
                    <div className='w-full border-t mb-2'/>
                    <p className="text-gray-700">{project.purposes}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Participants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {project.participants.map((participant) => (
                            <div key={participant.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                <div className="relative w-24 h-24 mb-4 mx-auto">
                                    <Image
                                        src={participant.avatar}
                                        alt={participant.username}
                                        width={96}
                                        height={96}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 text-center">{participant.firstName} {participant.lastName}</h3>
                                <p className="text-gray-500 text-center">{participant.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Experts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {project.participants.map((participant) => (
                            <div key={participant.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                <div className="relative w-24 h-24 mb-4 mx-auto">
                                    <Image
                                        src={participant.avatar}
                                        alt={participant.username}
                                        width={96}
                                        height={96}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 text-center">{participant.firstName} {participant.lastName}</h3>
                                <p className="text-gray-500 text-center">{participant.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Attributes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {project.attributes.map((attribute) => (
                            <div key={attribute.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                <h3 className="text-xl font-semibold text-gray-700">{attribute.title}</h3>
                                <p className="text-gray-500">{attribute.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

