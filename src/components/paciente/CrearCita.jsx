import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCita } from "../../api/CitaRequest.js"; // Importa la función para guardar la cita

export function CrearCita() {
  const { psicologoId } = useParams();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [duracion, setDuracion] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCita({
        psicologoId,
        fecha,
        duracion: parseInt(duracion, 10),
        comentarios,
      });
      navigate("/citas"); // Navega a la lista de citas o un mensaje de éxito
    } catch (err) {
      setError("Hubo un error al programar la cita. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Programar Cita</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha y Hora
          </label>
          <input
            type="datetime-local"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="duracion"
            className="block text-sm font-medium text-gray-700"
          >
            Duración (minutos)
          </label>
          <input
            type="number"
            id="duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="comentarios"
            className="block text-sm font-medium text-gray-700"
          >
            Comentarios
          </label>
          <textarea
            id="comentarios"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
        >
          Programar Cita
        </button>
      </form>
    </div>
  );
}
