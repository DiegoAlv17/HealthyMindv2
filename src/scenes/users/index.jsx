import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { getPacientes, createPaciente, updatePaciente, deleteUser } from "../../api/UserRequest.js";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pacientes, setPacientes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", profilePicture: "", password: "", role: "paciente" });

  // Columnas de la tabla
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Correo Electrónico",
      flex: 1,
    },
    {
      field: "profilePicture",
      headerName: "Foto de Perfil",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Foto de perfil"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{ marginLeft: "10px" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </Box>
      ),
    },
  ];

  // Obtener datos de pacientes al montar el componente
  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const data = await getPacientes();
      const formattedData = data.map((paciente, index) => ({
        id: paciente._id || `row-${index}`,
        name: paciente.name,
        email: paciente.email,
        profilePicture: paciente.profilePicture,
      }));
      setPacientes(formattedData);
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  const handleOpenDialog = () => {
    setFormData({ name: "", email: "", profilePicture: "", password: "", role: "paciente" });
    setEditingPaciente(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (editingPaciente) {
        // Actualizar paciente
        await updatePaciente(editingPaciente.id, formData);
      } else {
        // Crear nuevo paciente
        await createPaciente(formData);
      }
      fetchPacientes();
      handleCloseDialog();
    } catch (error) {
      console.error("Error al guardar el paciente:", error);
    }
  };

  const handleEdit = (paciente) => {
    setEditingPaciente(paciente);
    setFormData({
      name: paciente.name,
      email: paciente.email,
      profilePicture: paciente.profilePicture,
      password: "",
      role: paciente.role || "paciente",
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchPacientes();
    } catch (error) {
      console.error("Error al eliminar el paciente:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Pacientes"
        subtitle="Lista de pacientes registrados en la aplicación"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        style={{ marginBottom: "20px" }}
      >
        Crear Paciente
      </Button>
      <Box
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
          rows={pacientes}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Diálogo para Crear/Editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingPaciente ? "Editar Paciente" : "Crear Paciente"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Correo Electrónico"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="profilePicture"
            label="URL de Foto de Perfil"
            type="text"
            fullWidth
            value={formData.profilePicture}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
