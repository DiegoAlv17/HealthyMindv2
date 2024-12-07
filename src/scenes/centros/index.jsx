import {
  Box,
  Button,
  Typography,
  useTheme,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import {
  createCentro,
  deleteCentro,
  getCentros,
  updateCentro,
} from "../../api/CentroRequest.js"; // Asegúrate de que las funciones estén bien implementadas
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";

const Centros = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para almacenar los datos de los centros de salud
  const [centros, setCentros] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Controla la apertura del diálogo
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    especialidad: "",
  }); // Datos del formulario
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando

  // Efecto para obtener los centros de salud
  useEffect(() => {
    const fetchCentros = async () => {
      const data = await getCentros();
      console.log("Centros de Salud:", data); // Añadir esto para inspeccionar los datos
      if (data) {
        const centrosData = data.map((centro) => ({
          id: centro._id,
          nombre: centro.nombre,
          direccion: centro.direccion,
          telefono: centro.telefono,
          correo: centro.correo,
          especialidad: centro.especialidad,
        }));
        setCentros(centrosData);
      }
    };

    fetchCentros();
  }, []);

  // Función para manejar el cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Función para abrir el formulario de crear/editar
  const openFormDialog = (centro = null) => {
    if (centro) {
      setFormData(centro); // Rellenar los datos si es para editar
      setIsEditing(true);
    } else {
      setFormData({
        nombre: "",
        direccion: "",
        telefono: "",
        correo: "",
        especialidad: "",
      }); // Limpiar el formulario si es para crear
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  // Función para crear o actualizar un centro de salud
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await updateCentro(formData.id, formData); // Actualizar centro de salud
      } else {
        await createCentro(formData); // Crear centro de salud
      }
      setOpenDialog(false);
      // Recargar los centros de salud actualizados desde la API
      const data = await getCentros();
      const centrosData = data.map((centro) => ({
        id: centro._id,
        nombre: centro.nombre,
        direccion: centro.direccion,
        telefono: centro.telefono,
        correo: centro.correo,
        especialidad: centro.especialidad,
      }));
      setCentros(centrosData);
    } catch (error) {
      console.error("Error al crear/actualizar el centro de salud:", error);
    }
  };

  // Función para eliminar un centro de salud
  const handleDelete = async (id) => {
    try {
      await deleteCentro(id); // Llamada a la API de eliminación
      const data = await getCentros(); // Recargar los datos
      const centrosData = data.map((centro) => ({
        id: centro._id,
        nombre: centro.nombre,
        direccion: centro.direccion,
        telefono: centro.telefono,
        correo: centro.correo,
        especialidad: centro.especialidad,
      }));
      setCentros(centrosData);
    } catch (error) {
      console.error("Error al eliminar el centro de salud:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "direccion", headerName: "Dirección", flex: 1 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "correo", headerName: "Correo", flex: 1 },
    { field: "especialidad", headerName: "Especialidad", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => openFormDialog(params.row)}>
            <EditIcon />
          </Button>
          <Button color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CENTROS DE SALUD"
        subtitle="Centros de salud que forman parte de HealthyMind"
      />

      {/* Botón de Agregar Centro de Salud */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => openFormDialog()}
        sx={{ marginBottom: "20px" }}
      >
        Agregar Centro de Salud
      </Button>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.pinkAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.pinkAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={centros} // Usamos los centros obtenidos de la API
          columns={columns}
          getRowId={(row) => row.id} // Usamos el id generado a partir de _id
        />
      </Box>

      {/* Diálogo de crear/editar centro de salud */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {isEditing ? "Editar Centro de Salud" : "Crear Centro de Salud"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Teléfono"
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Centros;
