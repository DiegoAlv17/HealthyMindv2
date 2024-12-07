import axios from "./axios.js";

export const getCitas = async ()=>{
    try{
        const response = await axios.get("/citas");
        return response.data;
    }
    catch(error){
        console.error("Erro")
    }
}

export const createCita = async(cita)=>{
    try{
        const response = await axios.post("/citas",cita)
        return response.data;
    } catch(error){
        console.error("Error")
    }
}

