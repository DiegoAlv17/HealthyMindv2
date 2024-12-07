import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';
import { useTheme, TextField, Button } from '@mui/material';
import { tokens } from '../theme';

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [newPercentage, setNewPercentage] = useState({});

  // Obtener los datos del gráfico desde el backend
  useEffect(() => {
    axios.get('https://hm-backend-production.up.railway.app/api/pieChart/pie-chart-data')
      .then(response => {
        console.log(response.data);  // Verificar los datos de la respuesta
        const groupedData = response.data.map(item => ({
          id: item.specialty,
          label: item.specialty,
          value: parseFloat(item.percentage),  // Asegúrate de convertirlo a número
        }));
        console.log(groupedData);  // Verificar cómo se ve el grupo de datos
        setData(groupedData);  // Establecer los datos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  }, []);

  const handleChange = (specialty, value) => {
    setNewPercentage({
      ...newPercentage,
      [specialty]: value
    });
  };

  const handleSave = (specialty) => {
    const updatedPercentage = newPercentage[specialty];
    if (updatedPercentage) {
      axios.post('https://hm-backend-production.up.railway.app/api/pieChart/pie-chart-data-update', {
        specialty,
        percentage: updatedPercentage
      })
      .then(response => {
        const updatedData = data.map(item =>
          item.id === specialty ? { ...item, value: updatedPercentage } : item
        );
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error al guardar el dato', error);
      });
    }
  };

  console.log(data);  // Verificar el estado de los datos antes de renderizar

  return (
    <div style={{ width: '100%', height: '600px', marginBottom: '20px' }}>
      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: { line: { stroke: colors.grey[100] } },
            legend: { text: { fill: colors.grey[100] } },
            ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
          },
          legends: {
            text: {
              color: 'white',  // Color blanco para el texto de las leyendas
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.3}
        padAngle={0.7}
        cornerRadius={3}
        colors={colors.pinkAccent[500]}
        borderWidth={1}
        borderColor={colors.grey[800]}
        arcLinkLabelsSkipAngle={10}
        arcLabel={({ label, value }) => `${label}: ${value}%`}  // Asegúrate de que esto funcione
        arcLinkLabelsTextColor="white"
        arcLabelsTextColor="white"
        tooltip={({ datum }) => {
          return (
            <div style={{
              backgroundColor: colors.grey[900],
              padding: '5px 10px',
              borderRadius: '4px',
              color: colors.grey[100]
            }}>
              <strong>{datum.id}</strong>: {datum.value}% de profesionales
            </div>
          );
        }}
      />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto' }}>
        {data.map(item => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '40px' }}>
            <TextField
              label={`% ${item.label}`}
              type="number"
              variant="outlined"
              value={newPercentage[item.label] || item.value}
              onChange={(e) => handleChange(item.label, e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
              InputLabelProps={{
                style: {
                  lineHeight: '2.5',  // Aquí aplicamos la propiedad lineHeight al label
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleSave(item.label)}
              style={{
                height: '36px',
                backgroundColor: colors.greenAccent[500],
                color: '#fff',
              }}
            >
              Guardar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

