"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Transition from '@/components/transition';
import { Role, getAllRoles } from '@/actions/roles';
import { UserRegistration, register } from '@/actions/users';
import Loading from '@/components/loading';
import { Lock } from 'lucide-react';

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [isFormValid, setIsFormValid] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<UserRegistration>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: new Date(),
        bio: '',
        roleName: ''
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRoles();
                setRoles(response);
            } catch (error) {
                console.error('Error fetching roles:', error);
                toast.error('Failed to fetch roles');
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let updatedValue: any = value;

        if (name === 'dob') {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                updatedValue = date;
            } else {
                return; 
            }
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));

        const updatedFormData = { ...formData, [name]: updatedValue };
        const isFormValid = Object.entries(updatedFormData).every(([key, value]) => {
            if (key === 'dob') {
                return value instanceof Date && !isNaN(value.getTime());
            }
            return typeof value === 'string' && value.trim() !== '';
        });

        setIsFormValid(isFormValid);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
        try {
            setLoading(true);
            const request = await register(formData);
            console.log(request);
            toast.success("Registered.");
            router.push('/sign-in');
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition>
            <div className="w-full h-full bg-gradient-to-tl from-orange-300 via-white to-rose-300 overflow-auto">
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1">Username</label>
                        <input type="text" id="username" name="username" value={formData.username as string} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input type="password" id="password" name="password" value={formData.password as string} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className='flex flex-row gap-x-5'>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block mb-1">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName as string} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block mb-1">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName as string} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob" className="block mb-1">Date of Birth</label>
                        <input type="date" id="dob" name="dob" value={formData.dob.toISOString().substring(0, 10)} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bio" className="block mb-1">Bio</label>
                        <textarea id="bio" name="bio" value={formData.bio as string} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="roleName" className="block mb-1">Role Name</label>
                        <select id="roleName" name="roleName" value={formData.roleName as string} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                            <option value="" disabled>Select Role</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role.title as string}>{role.title}</option>
                            ))}
                        </select>
                    </div>
                    <button disabled={!isFormValid || loading} type="submit" className="w-full bg-rose-500 disabled:opacity-70 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-all duration-300 flex flex-row gap-x-1 items-center justify-center">
                        Sign Up{' '}
                        {loading && <Loading className="h-5 w-5" />}
                        {!isFormValid && <Lock className='w-5 h-5' />}
                    </button>
                </form>
            </div>
        </Transition>
    );
}

export default SignUpPage;
