import { Box, Button, Typography, useTheme, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { getPsicologos, createPsicologo, updatePsicologo, deletePsicologo } from "../../api/PsicologosRequest.js"; // Asegúrate de que las funciones estén bien implementadas
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para almacenar los datos de los psicólogos
  const [psicologos, setPsicologos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Controla la apertura del diálogo
  const [formData, setFormData] = useState({ nombre: "", edad: "", telefono: "", correo: "", especialidad: "" }); // Datos del formulario
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando

  // Efecto para obtener los psicólogos
  useEffect(() => {
    const fetchPsicologos = async () => {
      const data = await getPsicologos();
      console.log("Psicólogos:", data);  // Añadir esto para inspeccionar los datos
      if (data) {
        const psicologosData = data.map(psicologo => ({
          id: psicologo._id,
          nombre: psicologo.nombre,
          edad: psicologo.edad,
          telefono: psicologo.telefono,
          correo: psicologo.correo,
          especialidad: psicologo.especialidad,
        }));
        setPsicologos(psicologosData);
      }
    };
  
    fetchPsicologos();
  }, []);

  // Función para manejar el cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Función para abrir el formulario de crear/editar
  const openFormDialog = (psicologo = null) => {
    if (psicologo) {
      setFormData(psicologo); // Rellenar los datos si es para editar
      setIsEditing(true);
    } else {
      setFormData({ nombre: "", edad: "", telefono: "", correo: "", especialidad: "" }); // Limpiar el formulario si es para crear
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  // Función para crear o actualizar un psicólogo
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await updatePsicologo(formData.id, formData); // Actualizar psicólogo
      } else {
        await createPsicologo(formData); // Crear psicólogo
      }
      setOpenDialog(false);
      // Recargar los psicólogos actualizados desde la API
      const data = await getPsicologos();
      const psicologosData = data.map(psicologo => ({
        id: psicologo._id,
        nombre: psicologo.nombre,
        edad: psicologo.edad,
        telefono: psicologo.telefono,
        correo: psicologo.correo,
        especialidad: psicologo.especialidad,
      }));
      setPsicologos(psicologosData);
    } catch (error) {
      console.error("Error al crear/actualizar el psicólogo:", error);
    }
  };

  // Función para eliminar un psicólogo
  const handleDelete = async (id) => {
    try {
      await deletePsicologo(id); // Llamada a la API de eliminación
      const data = await getPsicologos(); // Recargar los datos
      const psicologosData = data.map(psicologo => ({
        id: psicologo._id,
        nombre: psicologo.nombre,
        edad: psicologo.edad,
        telefono: psicologo.telefono,
        correo: psicologo.correo,
        especialidad: psicologo.especialidad,
      }));
      setPsicologos(psicologosData);
    } catch (error) {
      console.error("Error al eliminar el psicólogo:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "nombre", headerName: "Nombre", flex: 1, cellClassName: "name-column--cell" },
    { field: "edad", headerName: "Edad", type: "number", headerAlign: "left", align: "left" },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "correo", headerName: "Correo", flex: 1 },
    { field: "especialidad", headerName: "Especialidad", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            startIcon={<EditIcon />}
            onClick={() => openFormDialog(params.row)}
            sx={{ marginRight: "10px" }}
          >

          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >

          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="PSICÓLOGOS"
        subtitle="Psicólogos que forman parte del equipo de HealthyMind"
      />
      
      {/* Botón de Agregar Psicólogo */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => openFormDialog()}
        sx={{ marginBottom: "20px" }}
      >
        Agregar Psicólogo
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
          rows={psicologos} // Usamos los psicólogos obtenidos de la API
          columns={columns}
          getRowId={(row) => row.id} // Usamos el id generado a partir de _id
        />
      </Box>

      {/* Diálogo de crear/editar psicólogo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? "Editar Psicólogo" : "Crear Psicólogo"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
