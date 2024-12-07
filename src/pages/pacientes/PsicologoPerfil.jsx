import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Star, Calendar, MessageCircle } from 'lucide-react';
import { getPsicologoById } from '../../api/UserRequest.js'; // Importa la función para obtener el psicólogo

export function PsicologoPerfil() {
  const { id } = useParams(); // Obtén el id de la URL
  const navigate = useNavigate(); // Define la función navigate
  const [psychologist, setPsychologist] = useState(null); // Para almacenar los datos del psicólogo
  const [loading, setLoading] = useState(true); // Para controlar el estado de carga
  const [error, setError] = useState(null); // Para manejar posibles errores

  // Usamos useEffect para hacer la llamada a la API al montar el componente
  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const data = await getPsicologoById(id); // Llamada a la API para obtener los detalles del psicólogo
        setPsychologist(data); // Establece los datos en el estado
      } catch (err) {
        setError('Error al cargar los detalles del psicólogo');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologist();
  }, [id]); // Se vuelve a ejecutar cada vez que cambia el id

  if (loading) {
    return <div className="text-center p-4">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  // Si no hay psicólogo, mostramos un mensaje
  if (!psychologist) {
    return <div className="text-center p-4">Psicólogo no encontrado.</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-pink-400 to-pink-600" />

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex items-end -mt-16 mb-4">
              <img
                src={psychologist.profilePicture}
                alt={psychologist.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="ml-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{psychologist.name}</h1>
                <div className="flex items-center mt-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">
                    {psychologist.rating} ({psychologist.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600">{psychologist.bio}</p>

                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {psychologist.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">{psychologist.experience}</p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/crear-cita/${psychologist._id}`)} // Usa navigate para redirigir
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Programar Cita
                  </button>
                  <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
