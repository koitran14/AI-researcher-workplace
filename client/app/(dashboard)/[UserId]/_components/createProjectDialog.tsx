import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export function CreateProjectDialog() {
    const [project, setProject] = useState({
        title: "",
        description: "",
        goal: "",
        purposes: "",
    });

    const [titleValid, setTitleValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [goalValid, setGoalValid] = useState(false);
    const [purposesValid, setPurposesValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Project Created:", project);
        setProject({
            title: "",
            description: "",
            goal: "",
            purposes: "",
        });
    };

    useEffect(() => {
        const checkValidity = () => {
            setTitleValid(project.title.trim() !== "");
            setDescriptionValid(project.description.trim() !== "");
            setGoalValid(project.goal.trim() !== "");
            setPurposesValid(project.purposes.trim() !== "");
        };
        checkValidity()
    },[project.description, project.goal, project.purposes, project.title])
    
    const isFormValid = () => {
        return titleValid && descriptionValid && goalValid && purposesValid;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-slate-500 w-full h-10 p-0 flex items-center">
                    <p className="group-hover:block group-hover:mr-1 hidden">Create</p>
                    <Plus className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new project and click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right">
                            Title
                        </label>
                        <input
                            id="title"
                            value={project.title}
                            onChange={handleChange}
                            placeholder="Your title..."
                            className="col-span-3 bg-white border rounded-md p-2 resize-none h-12"                        
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <h1 className="text-right">Description</h1>
                        <textarea
                            id="description"
                            value={project.description}
                            onChange={handleChange}
                            placeholder="Write something..."
                            className="col-span-3 bg-white border rounded-md p-2 resize-none h-18"                        
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <h1 className="text-right">Goal</h1>
                        <textarea
                            id="goal"
                            value={project.goal}
                            onChange={handleChange}
                            placeholder="My goal is..."
                            className="col-span-3 bg-white border rounded-md p-2 resize-none h-18"                        
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="purposes" className="text-right">
                        Purposes
                    </Label>
                    <textarea
                        id="purposes"
                        value={project.purposes}
                        onChange={handleChange}
                        placeholder="We aim to..."
                        className="col-span-3 bg-white border rounded-md p-2 resize-none h-24"                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={!isFormValid}
                        className="bg-zinc-700 disabled:bg-zinc-200"
                    >
                        Create
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
