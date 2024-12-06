import React from "react";
import { Stethoscope, Calendar, Users, ArrowRight } from "lucide-react";

const Professionals = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Haz crecer tu práctica profesional
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a nuestra red de profesionales de la salud mental y conecta
              con pacientes que necesitan tu experiencia.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              Crear cuenta profesional
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <Stethoscope className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Perfil Profesional
              </h3>
              <p className="text-gray-600">
                Crea tu perfil destacando tu experiencia, especialidades y
                logros profesionales.
              </p>
            </div>
            <div className="p-6">
              <Calendar className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gestión de Agenda
              </h3>
              <p className="text-gray-600">
                Administra tus citas y horarios de manera eficiente con nuestro
                sistema integrado.
              </p>
            </div>
            <div className="p-6">
              <Users className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Conexión con Pacientes
              </h3>
              <p className="text-gray-600">
                Accede a una amplia red de pacientes que buscan profesionales
                como tú.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lo que dicen nuestros profesionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "HealthyMind me ha ayudado a expandir mi práctica y conectar con
                más pacientes. La plataforma es intuitiva y profesional."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Dra. María González"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Dra. María González
                  </p>
                  <p className="text-sm text-gray-500">Psicóloga Clínica</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "La gestión de citas y el seguimiento de pacientes es mucho más
                eficiente desde que uso HealthyMind."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Dr. Carlos Ruiz"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Dr. Carlos Ruiz
                  </p>
                  <p className="text-sm text-gray-500">Psiquiatra</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                "Una plataforma que realmente entiende las necesidades de los
                profesionales de la salud mental."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Dra. Ana Martínez"
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Dra. Ana Martínez
                  </p>
                  <p className="text-sm text-gray-500">Terapeuta Familiar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Professionals;
