import React from "react";
import { Search, Calendar, MessageCircle, ShieldCheck } from "lucide-react";

const Patients = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Encuentra el apoyo que necesitas
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Conecta con profesionales de la salud mental calificados que
              pueden ayudarte en tu camino hacia el bienestar emocional.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Buscar por especialidad o síntoma..."
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Buscar ayuda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca</h3>
              <p className="text-gray-600">
                Encuentra profesionales según tus necesidades específicas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifica</h3>
              <p className="text-gray-600">
                Revisa perfiles y credenciales verificadas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Agenda</h3>
              <p className="text-gray-600">
                Programa tu cita en el horario que prefieras
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conecta</h3>
              <p className="text-gray-600">
                Recibe atención profesional y seguimiento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Profesionales destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dra. Laura Sánchez",
                specialty: "Psicología Clínica",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 4.9,
                reviews: 128,
              },
              {
                name: "Dr. Miguel Ángel Torres",
                specialty: "Psiquiatría",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 4.8,
                reviews: 93,
              },
              {
                name: "Dra. Carmen Rodríguez",
                specialty: "Terapia Familiar",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                rating: 4.9,
                reviews: 156,
              },
            ].map((professional) => (
              <div
                key={professional.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {professional.name}
                      </h3>
                      <p className="text-gray-600">{professional.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600">
                        {professional.rating}
                      </span>
                      <span className="ml-1 text-gray-500">
                        ({professional.reviews} reseñas)
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                      Ver perfil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Preguntas frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Cómo elijo al profesional adecuado?
              </h3>
              <p className="text-gray-600">
                Puedes revisar los perfiles, especialidades, experiencia y
                reseñas de otros pacientes para encontrar el profesional que
                mejor se adapte a tus necesidades.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Las consultas son confidenciales?
              </h3>
              <p className="text-gray-600">
                Sí, garantizamos la confidencialidad de todas las consultas y la
                información compartida entre pacientes y profesionales.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Puedo cambiar de profesional?
              </h3>
              <p className="text-gray-600">
                Sí, tienes la libertad de elegir y cambiar de profesional en
                cualquier momento si sientes que necesitas una perspectiva
                diferente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Cómo funciona el pago?
              </h3>
              <p className="text-gray-600">
                Ofrecemos diferentes métodos de pago seguros y puedes gestionar
                tus consultas de manera transparente a través de la plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Patients;
