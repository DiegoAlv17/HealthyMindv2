import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/paciente/Sidebar';
import { PsicologosBusqueda } from '../../components/paciente/PsicologosBusqueda';

const PacientesLayout=()=> {
  return (
    <div className=" min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="w-full flex-1 border-x border-gray-200 max-w-2xl">
        <Outlet />
      </main>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-80 p-4">
        <PsicologosBusqueda />
      </div>
    </div>
  );
}

export default PacientesLayout;