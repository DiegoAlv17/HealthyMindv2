import React, { useState, useEffect, useContext } from "react";
import { Camera } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { updateUser } from "../../api/UserRequest"; // Asegúrate de importar tu función para actualizar el usuario

export function Perfil() {
  const { user, logout, setUser } = useContext(AuthContext); // Obtener datos del usuario logueado y la función logout

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error
  const [loading, setLoading] = useState(false); // Para mostrar un estado de carga mientras se guarda

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  // Función para actualizar el perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear objeto actualizado
      const updatedUser = {
        name,
        email,
        bio,
        profilePicture,
        role: "paciente",
      };

      // Llamar al endpoint para actualizar
      const updatedUserData = await updateUser(user.id, updatedUser);
      if (!updatedUserData._id) {
        throw new Error("El usuario actualizado no contiene un id.");
      }

      // Actualizar el estado del usuario
      setUser(updatedUserData);

      // Persistir en localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setMessage("Perfil actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setMessage("Hubo un error al actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout(); // Llamar a la función logout del contexto para cerrar sesión
    setMessage(""); // Limpiar el mensaje al cerrar sesión
  };

  // Función para manejar el cambio de URL de la imagen de perfil
  const handleProfilePictureUrlChange = (e) => {
    const url = e.target.value;
    
    // Validar que la URL sea una URL válida
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (regex.test(url)) {
      setProfilePicture(url); // Establecer la imagen si la URL es válida
    } else {
      alert("La URL ingresada no es válida.");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src={
                    profilePicture ||
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button
                  className="absolute bottom-0 right-0 p-2 bg-pink-600 rounded-full text-white hover:bg-pink-700 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mensaje de éxito o error */}
            {message && <div className="mb-4 text-green-600">{message}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label
                  htmlFor="profilePictureUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="profilePictureUrl"
                  value={profilePicture}
                  onChange={handleProfilePictureUrlChange} // Manejar cambio de URL
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading} // Deshabilita el botón mientras está cargando
                  className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
