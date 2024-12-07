import api from "./axios";

export const getCentros = async () => {
    try {
        const response = await api.get("/centros");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los centros:", error);
    }
}

export const getCentroById = async (id) => {
    try {
        const response = await api.get(`/centros/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el centro:", error);
    }
}

export const createCentro = async (centro) => {
    try {
        const response = await api.post("/centros", centro);
        return response.data;
    } catch (error) {
        console.error("Error al crear el centro:", error);
    }
}

export const updateCentro = async (id, centro) => {
    try {
        const response = await api.put(`/centros/${id}`, centro);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el centro:", error);
    }
}

export const deleteCentro = async (id) => {
    try {
        const response = await api.delete(`/centros/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el centro:", error);
    }
}

export const getCentrosByPsicologo = async (id) => {
    try {
        const response = await api.get(`/centros/psicologo/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los centros del psicologo:", error);
    }
}

export const getCentrosByPaciente = async (id) => {
    try {
        const response = await api.get(`/centros/paciente/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los centros del paciente:", error);
    }
}

