import axios from "axios"

export interface Role {
    id: Number,
    title: String
}

export const getAllRoles = async() => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}