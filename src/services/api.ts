import axios from "axios"
import { Post } from "@/constants/columns"

const BASE_URL = "https://reqres.in"

export const fetchPost = async (page: number, pageSize: number) => {
    console.log(page, pageSize)
    const response = await axios.get(`${BASE_URL}/api/users?page=${page}`);
    return response.data.data
}

export const deletePosts = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/users/${id}`);
        console.log("delete response: ", response.data)
        //queryClient.invalidateQueries({ queryKey: ["posts"] });
        alert("user deleted successfully");
    } catch (e) {
        console.error(e)
        alert("Failed to delete user")
    }
}

export const updatePosts = async (updatedUser: Post) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/users/${updatedUser.id}`, updatedUser);
        console.log("response is: ", response.data);
        return response.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update user");
    }
}