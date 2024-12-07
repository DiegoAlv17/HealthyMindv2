import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from "../../api/PacientesRequest.js";  // Asegúrate de importar las funciones necesarias
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Estado para almacenar los pacientes
  const [pacientes, setPacientes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Controla la apertura del diálogo
  const [isEditMode, setIsEditMode] = useState(false); // Controla si estamos en modo de edición
  const [selectedPaciente, setSelectedPaciente] = useState(null); // Paciente seleccionado
  const [formData, setFormData] = useState({ nombre: "", edad: "", telefono: "", correo: "", direccion: "", ciudad: "" }); // Datos del formulario

  // Llamada a la API para obtener los pacientes
  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await getPacientes();
      if (data) {
        // Mapea los datos de la API a las columnas necesarias para el DataGrid
        const pacientesData = data.map(paciente => ({
          id: paciente._id,   // Asegúrate de que `_id` sea el identificador único
          name: paciente.nombre,
          age: paciente.edad,
          phone: paciente.telefono,
          email: paciente.correo,
          address: paciente.direccion,
          city: paciente.ciudad,
        }));
        setPacientes(pacientesData);
      }
    };

    fetchPacientes();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </>
      )
    }
  ];

  // Función para manejar el cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Función para manejar el envío del formulario (crear o actualizar)
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        // Actualizar el paciente
        await updatePaciente(selectedPaciente.id, formData);
      } else {
        // Crear un nuevo paciente
        await createPaciente(formData);
      }
      setOpenDialog(false);
      // Actualizar la lista de pacientes
      const data = await getPacientes();
      const pacientesData = data.map(paciente => ({
        id: paciente._id,
        name: paciente.nombre,
        age: paciente.edad,
        phone: paciente.telefono,
        email: paciente.correo,
        address: paciente.direccion,
        city: paciente.ciudad,
      }));
      setPacientes(pacientesData);
    } catch (error) {
      console.error("Error al guardar paciente:", error);
    }
  };

  // Función para manejar la edición de un paciente
  const handleEdit = (paciente) => {
    setIsEditMode(true);
    setSelectedPaciente(paciente);
    setFormData({
      nombre: paciente.name,
      edad: paciente.age,
      telefono: paciente.phone,
      correo: paciente.email,
      direccion: paciente.address,
      ciudad: paciente.city
    });
    setOpenDialog(true);
  };

  // Función para manejar la eliminación de un paciente
  const handleDelete = async (id) => {
    try {
      await deletePaciente(id); // Llamada a la API para eliminar el paciente
      // Actualizar la lista de pacientes
      const data = await getPacientes();
      const pacientesData = data.map(paciente => ({
        id: paciente._id,
        name: paciente.nombre,
        age: paciente.edad,
        phone: paciente.telefono,
        email: paciente.correo,
        address: paciente.direccion,
        city: paciente.ciudad,
      }));
      setPacientes(pacientesData);
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Usuarios"
        subtitle="Lista de usuarios registrados en la aplicación"
      />
      <Button 
        onClick={() => setOpenDialog(true)} 
        color="primary" 
        variant="contained"
        sx={{ marginBottom: '20px' }}
      >
        Agregar Paciente
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={pacientes}  // Usamos los pacientes obtenidos de la API
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Diálogo para agregar o editar paciente */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditMode ? "Editar Paciente" : "Crear Paciente"}</DialogTitle>
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
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
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

export default Users;
