import React from "react";
import { Link } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-primary-600">
                HealthyMind
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/professionals"
              className="text-gray-600 hover:text-primary-600"
            >
              Profesionales
            </Link>
            <Link
              to="/patients"
              className="text-gray-600 hover:text-primary-600"
            >
              Pacientes
            </Link>
            <Link
              to="/health-centers"
              className="text-gray-600 hover:text-primary-600"
            >
              Centros de Salud
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary-600"

            >
              Contacto
            </Link>
            <Link
              to="/login"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/professionals"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                Profesionales
              </Link>
              <Link
                to="/patients"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                Pacientes
              </Link>
              <Link
                to="/health-centers"
                className="block px-3 py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                Centros de Salud
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 bg-primary-600 text-white rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
