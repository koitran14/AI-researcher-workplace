import { useEffect, useState } from 'react';
import Project from './projectContainer'; // Import the Project component

interface Project {
    id: number;
    name: string;
    field: string;
}

interface ProjectListProps {
    selectedField: string | null;
}

const ProjectList: React.FC<ProjectListProps> = ({ selectedField }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

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

    const filteredProjects = fakeProjects.filter(
        project => project.field === selectedField 
        && project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="overflow-auto flex flex-col gap-y-2">
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border rounded-xl w-80 px-3 py-2 mb-2"
            />
            <ul className="flex flex-col gap-y-2">
                {filteredProjects.map(project => (
                    <li key={project.id}>
                        <Project
                            id={project.id}
                            title={project.name}
                            description="This is for description line."
                            participants={[
                                { id: 1, username: "User 1" },
                                { id: 2, username: "User 2" },
                            ]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
