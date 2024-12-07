import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme, TextField, Button } from '@mui/material';
import { tokens } from '../theme';

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Usar la paleta de colores de tu tema
  const [data, setData] = useState([]);
  const [newCount, setNewCount] = useState({});
  
  // Obtener los datos del gráfico desde el backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/barChart/bar-chart-data')
      .then(response => {
        const groupedData = response.data.reduce((acc, item) => {
          const existingItem = acc.find(data => data.category === item.category);
          if (existingItem) {
            existingItem.count += item.count;
          } else {
            acc.push({ category: item.category, count: item.count });
          }
          return acc;
        }, []);
        console.log(groupedData);  // Imprimir los datos agrupados
        setData(groupedData);
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  }, []);
  

  // Función para manejar el cambio de valor en el campo de entrada
  const handleChange = (category, value) => {
    setNewCount({
      ...newCount,
      [category]: value
    });
  };

  // Función para guardar los cambios en la base de datos
  const handleSave = (category) => {
    const updatedCount = newCount[category];
    if (updatedCount) {
      axios.post('http://localhost:3000/api/barChart/bar-chart-data-update', {
        category,
        count: updatedCount
      })
      .then(response => {
        // Actualizar los datos en el frontend después de guardar
        const updatedData = data.map(item =>
          item.category === category ? { ...item, count: updatedCount } : item
        );
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error al guardar el dato', error);
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '600px', marginBottom: '20px' }}>
      <ResponsiveBar
        data={data}
        theme={{
          axis: {
            domain: { line: { stroke: colors.grey[100] } },
            legend: { text: { fill: colors.grey[100] } },
            ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
          },
          legends: { text: { fill: colors.grey[100] } },
        }}
        keys={['count']}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={(bar) => colors.pinkAccent[500]}  // Aquí se personaliza el color de las barras
        
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Categorías',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Número de Profesionales',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        // Configuración del Tooltip
        tooltip={({ id, value, data }) => (
          <div style={{
            backgroundColor: colors.grey[900],
            padding: '5px 10px',
            borderRadius: '4px',
            color: colors.grey[100]
          }}>
            <strong>{data.category}</strong>: {value} profesionales
          </div>
        )}
      />

      {/* Campos de entrada para cada categoría */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto'}}>
        {data.map(item => (
          <div key={item.category} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '40px' }}>
            <TextField
              label={`N° ${item.category}`}
              type="number"
              variant="outlined"
              value={newCount[item.category] || item.count}
              onChange={(e) => handleChange(item.category, e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
              InputLabelProps={{
                style: { fontSize: '12px', lineHeight: '3.4', whiteSpace: 'normal' }, // Ajustes de la etiqueta
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleSave(item.category)}
              style={{
                height: '36px',
                backgroundColor: colors.greenAccent[500], // Color base
                color: '#fff', // Texto legible
                transition: 'background-color 0.3s ease', // Suaviza la transición
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.greenAccent[700]; // Color al pasar el mouse
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.greenAccent[500]; // Regresa al color base
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

export default BarChart;

