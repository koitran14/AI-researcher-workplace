import axios from "axios"

export interface User{
    id: Number,
    username: String,
    password: String,
    dob: Date,
    bio: String,
    roleName: String,
    firstName: String,
    lastName: String,
    avatar: string | null,
    fields: []
    projects: []
}


export interface UserRegistration{
    username: String,
    password: String,
    roleName: String,
    firstName: String,
    lastName: String,
    dob: Date,
    bio: String,
}

interface SignInUser {
    username: String,
    password: String
}


export type Token = string | null;

export async function signIn(user: SignInUser){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        username: user.username,
        password: user.password
    },{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log(user)
    return response;
}

export async function register(user: UserRegistration){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, user ,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(user)
    return response;
}

export async function getUser(UserId: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${UserId}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }


}

export async function getCurrentUser(token: string) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/currentUser`, {
            access_token: token,
            token_type: "bearer"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
    }
}

export function checkOverTokenExpiration(token: string): Boolean{    
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    const tokenExpiration = tokenData.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now(); // Get current time in milliseconds
    return (currentTime > tokenExpiration)
}
