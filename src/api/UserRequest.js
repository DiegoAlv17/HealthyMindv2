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

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user", error);
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

export const updatePsicologo = async (id, psicologo) => {
    try {
        const response = await axios.put(`/psicologos/${id}`, psicologo);
        return response.data;
    } catch (error) {
        console.error("Error updating psicologo", error);
        throw error;
    }
}

export const createPsicologo = async(psicologo) =>{
    try{
        const response = await axios.post("/psicologos",psicologo);
        return response.data;
    }
    catch(error){
        console.error("Error psico",error)
        throw error;
    }
}

//pacientes
export const getPacientes = async () => {
    try {
        const response = await axios.get("/pacientes");
        return response.data;
    } catch (error) {
        console.error("Error fetching pacientes", error);
        throw error;
    }
}

export const getPacienteById = async (id) => {
    try {
        const response = await axios.get(`/pacientes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching paciente", error);
        throw error;
    }
}

export const updatePaciente = async (id, paciente) => {
    try {
        const response = await axios.put(`/pacientes/${id}`, paciente);
        return response.data;
    } catch (error) {
        console.error("Error updating paciente", error);
        throw error;
    }
}

export const createPaciente = async (paciente) => {
    try {
        const response = await axios.post("/pacientes", paciente);
        return response.data;
    } catch (error) {
        console.error("Error creating paciente", error);
        throw error;
    }
}


