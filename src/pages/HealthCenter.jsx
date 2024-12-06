import React from "react";
import { Building2, Users, BarChart, Shield } from "lucide-react";

const HealthCenters = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Soluciones para Centros de Salud Mental
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Optimiza la gestión de tu centro de salud mental con nuestra
              plataforma integral de servicios.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              Solicitar demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Building2 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gestión Centralizada
              </h3>
              <p className="text-gray-600">
                Administra todos los aspectos de tu centro desde una única
                plataforma.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gestión de Personal
              </h3>
              <p className="text-gray-600">
                Coordina tu equipo de profesionales y optimiza la asignación de
                recursos.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <BarChart className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Análisis y Reportes
              </h3>
              <p className="text-gray-600">
                Accede a estadísticas detalladas y genera informes
                personalizados.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Shield className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Seguridad y Privacidad
              </h3>
              <p className="text-gray-600">
                Garantiza la protección de datos sensibles con nuestros
                protocolos de seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Casos de Éxito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Centro de Salud Mental"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Centro de Bienestar Integral
              </h3>
              <p className="text-gray-600 mb-4">
                "Desde que implementamos HealthyMind, hemos aumentado nuestra
                eficiencia en un 40% y mejorado la satisfacción de nuestros
                pacientes."
              </p>
              <p className="text-sm text-gray-500">
                - Dr. Roberto Méndez, Director Médico
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Clínica de Salud Mental"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clínica Nueva Vida
              </h3>
              <p className="text-gray-600 mb-4">
                "La plataforma nos ha permitido expandir nuestros servicios y
                mejorar la coordinación entre profesionales."
              </p>
              <p className="text-sm text-gray-500">
                - Dra. Patricia López, Coordinadora General
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Planes para Centros de Salud
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Básico
              </h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">
                $299
                <span className="text-base font-normal text-gray-600">
                  /mes
                </span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Hasta 5 profesionales
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Gestión básica de citas
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Reportes mensuales
                </li>
              </ul>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Comenzar
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary-500 relative">
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg">
                Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Profesional
              </h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">
                $599
                <span className="text-base font-normal text-gray-600">
                  /mes
                </span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Hasta 15 profesionales
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Gestión avanzada de citas
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Reportes personalizados
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Soporte prioritario
                </li>
              </ul>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Comenzar
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Empresarial
              </h3>
              <p className="text-4xl font-bold text-gray-900 mb-6">
                $999
                <span className="text-base font-normal text-gray-600">
                  /mes
                </span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Profesionales ilimitados
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Gestión completa
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  API personalizada
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Soporte 24/7
                </li>
              </ul>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Contactar ventas
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthCenters;
