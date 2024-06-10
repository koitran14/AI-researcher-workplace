import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

interface Participant {
    id: number;
    username: string;
}

interface ProjectProps {
    id: number;
    title: string;
    description: string;
    participants: Participant[];
}

const Project: React.FC<ProjectProps> = ({ id, title, description, participants }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleDirection = () => {
        router.push(`${pathname}/projects/${id}`);
    }

    return (
        <Button 
            className="bg-white shadow-md rounded-md overflow-hidden mb-6 w-full h-fit flex flex-col px-6 py-4 items-start
                hover:bg-yellow-100
            "
            onClick={handleDirection}
        >
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Participants:</h3>
                <ul className='items-start'>
                    {participants.map(participant => (
                        <li key={participant.id} className="text-gray-500 text-sm">
                            {participant.username}
                        </li>
                    ))}
                </ul>
            </div>
        </Button>
    );
};

export default Project;
