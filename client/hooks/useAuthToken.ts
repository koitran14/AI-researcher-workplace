import { Token, User, checkOverTokenExpiration, getCurrentUser, getUser } from '@/actions/users';
import { useState, useEffect } from 'react';

const useAuthToken = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<Token | null>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('token');
        }
        return null;
    });

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token && checkOverTokenExpiration(token)) {
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.removeItem('token');
                }
                setToken(null);
                setCurrentUser(null);
            }
        };

        const fetchUser = async () => {
            setLoading(true);
            try {
                if (token) {
                    const response = await getCurrentUser(token);
                    const detailedCurrentUser = await getUser(response.id);
                    setCurrentUser(detailedCurrentUser);
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        token && fetchUser()

        const intervalId = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(intervalId);
    }, [token]);

    

    const saveToken = (userToken: string) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('token', userToken);
        }
        setToken(userToken);
    };

    const removeToken = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('token');
        }
        setToken(null);
    };

    return {
        setToken: saveToken,
        token,
        removeToken,
        currentUser,
        loading,
    };
};

export default useAuthToken;
