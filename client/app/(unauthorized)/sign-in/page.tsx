"use client"

import { signIn } from "@/actions/users";
import Loading from "@/components/loading";
import Transition from "@/components/transition";
import useAuthToken from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setToken, token } = useAuthToken();
    const router = useRouter();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        try {
            setLoading(true);
            const user = { username, password };
            const loginRequest = await signIn(user);

            if (loginRequest.status === 200) {
                toast.success('Signed in.');
                setToken(loginRequest.data.access_token);  
                router.push('/dashboard'); 
            } else if (loginRequest.status === 401) {
                setError('Wrong username or password.');
            } else {
                setError('An unexpected error occurred.');
            }
        } catch (error) {
            toast.error('Internal Error.');
            setError('An error occurred while signing in.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition>
            <div className="w-full h-full flex items-center justify-center rounded-md p-4 bg-gradient-to-tl from-orange-300 via-white to-rose-300">
            <form 
                className="bg-white p-6 rounded-md shadow-md w-full max-w-sm" 
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition duration-200 flex flex-row items-center justify-center gap-x-2"
                >
                    Sign In {' '}
                    {loading && <Loading className="h-5 w-5"/>}
                </button>
                <div className="my-4 border-t-2"/>
                <button 
                    onClick={() => router.push('/sign-up')}
                    className="w-full border text-black py-2 rounded-md hover:bg-rose-600 hover:text-white transition duration-200"
                >
                    Sign Up 
                </button>
            </form>
            </div>
        </Transition>
    );
}
 
export default SignInPage;