import api from "./axios";

export const getPacientes = async () => {
    try {
        const response = await api.get("/pacientes");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
    }
}

export const getPacienteById = async (id) => {
    try {
        const response = await api.get(`/pacientes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
    }
}

export const createPaciente = async (paciente) => {
    try {
        const response = await api.post("/pacientes", paciente);
        return response.data;
    } catch (error) {
        console.error("Error al crear el paciente:", error);
    }
}

export const updatePaciente = async (id, paciente) => {
    try {
        const response = await api.put(`/pacientes/${id}`, paciente);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
    }
}

export const deletePaciente = async (id) => {
    try {
        const response = await api.delete(`/pacientes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
    }
}
