import React from "react";
import { Brain, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-primary-600">
                HealthyMind
              </span>
            </div>
            <p className="text-gray-600">
              Conectando personas con la ayuda profesional que necesitan.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Servicios
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/professionals"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Para Profesionales
                </Link>
              </li>
              <li>
                <Link
                  to="/patients"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Para Pacientes
                </Link>
              </li>
              <li>
                <Link
                  to="/health-centers"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Centros de Salud
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Compañía
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} HealthyMind. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
