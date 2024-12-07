import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPsicologos } from '../../api/UserRequest.js'; // Importa tu función getPsicologos

export function PsicologosBusqueda() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]); // Resultados filtrados
  const [allPsychologists, setAllPsychologists] = useState([]); // Lista completa de psicólogos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Llamada a la API para obtener los psicólogos
  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const psicologos = await getPsicologos(); // Llama a la función de la API
        setAllPsychologists(psicologos); // Guardar los psicólogos completos
        setResults(psicologos); // Inicializa los resultados con todos los psicólogos
      } catch (err) {
        setError('Error al cargar los psicólogos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  // Función de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Si el término de búsqueda está vacío, muestra todos los psicólogos
    if (term === '') {
      setResults(allPsychologists);  // Restablecer a la lista completa de psicólogos
    } else {
      // Filtrar psicólogos basados en el término de búsqueda
      const filtered = allPsychologists.filter(
        (psych) =>
          psych.name.toLowerCase().includes(term.toLowerCase()) ||
          psych.specialties.some((s) => s.toLowerCase().includes(term.toLowerCase()))
      );
      setResults(filtered);
    }
  };

  // Mostrar resultados mientras carga
  if (loading) {
    return <div className="text-center p-4">Cargando psicólogos...</div>;
  }

  // Mostrar mensaje de error
  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar psicólogos..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="space-y-4">
        {results.map((psychologist) => (
          <Link
            key={psychologist.id}
            to={`/pacientes/psicologo/${psychologist._id}`}
            className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <img
                src={psychologist.profilePicture}
                alt={psychologist.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900">{psychologist.name}</h3>
                <p className="text-sm text-gray-500">
                  {psychologist.specialties.join(', ')}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {psychologist.rating} ({psychologist.reviews} reseñas)
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
