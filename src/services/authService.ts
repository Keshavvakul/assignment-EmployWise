import axios from "axios"

export const handleLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post("https://reqres.in/api/login", {
            email,
            password
        });
        const { token } = response.data
        localStorage.setItem("token", token);
        return token;
    } catch (e) {
        console.error(e);
        throw new Error("Login Failed")
    }
}