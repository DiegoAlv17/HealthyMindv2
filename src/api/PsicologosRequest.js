import api from "./axios";

export const getPsicologos = async () => {
    try {
        const response = await api.get("/psicologos");
        return response.data.psicologos;
    } catch (error) {
        console.error("Error al obtener los psicologos:", error);
    }
}

export const getPsicologoById = async (id) => {
    try {
        const response = await api.get(`/psicologos/${id}`);
        return response.data.psicologo;
    } catch (error) {
        console.error("Error al obtener el psicologo:", error);
    }
}

export const createPsicologo = async (psicologo) => {
    try {
        const response = await api.post("/psicologos", psicologo);
        return response.data;
    } catch (error) {
        console.error("Error al crear el psicologo:", error);
    }
}


export const updatePsicologo = async (id, psicologo) => {
    try {
        const response = await api.put(`/psicologos/${id}`, psicologo);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el psicologo:", error);
    }
}

export const deletePsicologo = async (id) => {
    try {
        const response = await api.delete(`/psicologos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el psicologo:", error);
    }
}