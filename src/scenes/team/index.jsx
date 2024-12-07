import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { getPsicologos, createPsicologo, updatePsicologo,deleteUser } from "../../api/UserRequest.js";

const Psychologists = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [psicologos, setPsicologos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPsicologo, setEditingPsicologo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    password: "",
    role: "psicologo",
    bio: "",
    experiencie: "",
    specialties: [],
  });

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
      field: "bio",
      headerName: "Biografía",
      flex: 1.5,
    },
    {
      field: "experiencie",
      headerName: "Experiencia",
      flex: 1,
    },
    {
      field: "specialties",
      headerName: "Especialidades",
      flex: 1.5,
      renderCell: (params) => params.value.join(", "),
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

  // Obtener datos de psicólogos al montar el componente
  useEffect(() => {
    fetchPsicologos();
  }, []);

  const fetchPsicologos = async () => {
    try {
      const data = await getPsicologos();
      const formattedData = data.map((psicologo, index) => ({
        id: psicologo._id || `row-${index}`,
        name: psicologo.name,
        email: psicologo.email,
        profilePicture: psicologo.profilePicture,
        bio: psicologo.bio,
        experiencie: psicologo.experiencie,
        specialties: psicologo.specialties || [],
      }));
      setPsicologos(formattedData);
    } catch (error) {
      console.error("Error al obtener los psicólogos:", error);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      name: "",
      email: "",
      profilePicture: "",
      password: "",
      role: "psicologo",
      bio: "",
      experiencie: "",
      specialties: [],
    });
    setEditingPsicologo(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecialtiesChange = (e) => {
    const specialties = e.target.value.split(",").map((s) => s.trim());
    setFormData({ ...formData, specialties });
  };

  const handleSave = async () => {
    try {
      if (editingPsicologo) {
        // Actualizar psicólogo
        await updatePsicologo(editingPsicologo.id, formData);
      } else {
        // Crear nuevo psicólogo
        await createPsicologo(formData);
      }
      fetchPsicologos();
      handleCloseDialog();
    } catch (error) {
      console.error("Error al guardar el psicólogo:", error);
    }
  };

  const handleEdit = (psicologo) => {
    setEditingPsicologo(psicologo);
    setFormData({
      name: psicologo.name,
      email: psicologo.email,
      profilePicture: psicologo.profilePicture,
      password: "",
      role: psicologo.role || "psicologo",
      bio: psicologo.bio,
      experiencie: psicologo.experiencie,
      specialties: psicologo.specialties,
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchPsicologos();
    } catch (error) {
      console.error("Error al eliminar el psicólogo:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Psicólogos"
        subtitle="Lista de psicólogos registrados en la aplicación"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        style={{ marginBottom: "20px" }}
      >
        Crear Psicólogo
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
          rows={psicologos}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Diálogo para Crear/Editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingPsicologo ? "Editar Psicólogo" : "Crear Psicólogo"}</DialogTitle>
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
          <TextField
            margin="dense"
            name="bio"
            label="Biografía"
            type="text"
            fullWidth
            value={formData.bio}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="experiencie"
            label="Experiencia"
            type="text"
            fullWidth
            value={formData.experiencie}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="specialties"
            label="Especialidades (separadas por comas)"
            type="text"
            fullWidth
            value={formData.specialties.join(", ")}
            onChange={handleSpecialtiesChange}
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

export default Psychologists;
