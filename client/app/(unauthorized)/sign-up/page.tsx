"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Transition from '@/components/transition';

interface FormData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    bio: string;
    roleName: string;
}

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [isFormValid, setIsFormValid] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        bio: '',
        roleName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setIsFormValid(Object.values(formData).every(value => value.trim() !== ''));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can perform form validation here before submitting the data
        // Assuming you have a function to send data to the backend
        //sendDataToBackend(formData);

        console.log(formData)
        toast.success("Registered.")// Redirect to success page after form submission
        router.push('/sign-in')
    };

    return (
        <Transition>
            <div className="w-full h-full bg-gradient-to-tl from-orange-300 via-white to-rose-300 overflow-auto">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className='flex flex-row gap-x-5'>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-1">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-1">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block mb-1">Date of Birth</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label htmlFor="bio" className="block mb-1">Bio</label>
                    <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label htmlFor="roleName" className="block mb-1">Role Name</label>
                    <input type="text" id="roleName" name="roleName" value={formData.roleName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <button disabled={!isFormValid} type="submit" className="w-full bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-all duration-300">Sign Up</button>
            </form>
            </div>
        </Transition>
    );
}

export default SignUpPage;
