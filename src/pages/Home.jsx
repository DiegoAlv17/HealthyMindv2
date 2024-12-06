import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Building2, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Encuentra la ayuda que
              <span className="text-primary-600"> necesitas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Conectamos a personas con profesionales de la salud mental de
              manera rápida y segura. Tu bienestar emocional es nuestra
              prioridad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/patients"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Buscar Ayuda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/professionals"
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Soy Profesional
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir HealthyMind?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una plataforma integral que conecta a todos los actores
              del ecosistema de salud mental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Para Pacientes
              </h3>
              <p className="text-gray-600">
                Encuentra el profesional adecuado para ti, agenda citas
                fácilmente y recibe atención de calidad.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Para Profesionales
              </h3>
              <p className="text-gray-600">
                Gestiona tu práctica profesional, aumenta tu visibilidad y
                conecta con quienes necesitan tu ayuda.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Centros de Salud
              </h3>
              <p className="text-gray-600">
                Promociona tus servicios, gestiona tu equipo y optimiza la
                atención a tus pacientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comienza tu camino hacia el bienestar emocional
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y descubre cómo podemos ayudarte a
            encontrar el apoyo que necesitas o a crecer como profesional.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
          >
            Contáctanos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
