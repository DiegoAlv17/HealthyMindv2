import axios from "./axios.js";

export const getUsers = async () => {
    try {
        const response = await axios.get("/users");
        console.log("Users fetched", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users", error);
        throw error;
    }
}

export const updateUser = async (userId, user) => {
    console.log("Updating user", userId, user);
    try {
        const response = await axios.put(`/users/${userId}`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}

//Psicólogos

export const getPsicologos = async () => {
    try {
        const response = await axios.get("/psicologos");
        return response.data;
    } catch (error) {
        console.error("Error fetching psicologos", error);
        throw error;
    }
}

export const getPsicologoById = async (id) => {
    try {
        const response = await axios.get(`/psicologos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching psicologo", error);
        throw error;
    }
}