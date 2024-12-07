import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';
import { useTheme, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { tokens } from '../theme';

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Usar la paleta de colores de tu tema
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [newCount, setNewCount] = useState({});

  // Obtener los datos del gráfico desde el backend
  useEffect(() => {
    axios.get('https://hm-backend-production.up.railway.app/api/lineChart/line-chart-data')
      .then(response => {
        // Mapea los datos para que cada mes tenga su respectivo valor
        const groupedData = response.data.map(item => ({
          x: item.month,  // Mes
          y: item.professionalsCount  // Número de profesionales
        }));
        console.log(groupedData);  // Imprimir los datos agrupados
        setData(groupedData);
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  }, []);

  // Función para manejar el cambio en el selector de mes
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    const monthData = data.find(item => item.x === event.target.value);
    if (monthData) {
      setNewCount({ [event.target.value]: monthData.y });
    }
  };

  // Función para manejar el cambio en el campo de cantidad
  const handleCountChange = (event) => {
    setNewCount({
      ...newCount,
      [selectedMonth]: event.target.value
    });
  };

  // Función para guardar los cambios en la base de datos
  const handleSave = () => {
    if (selectedMonth && newCount[selectedMonth]) {
      const updatedCount = newCount[selectedMonth];
      axios.post('https://hm-backend-production.up.railway.app/api/lineChart/line-chart-data-update', {
        month: selectedMonth,
        professionalsCount: updatedCount
      })
      .then(response => {
        // Actualizar los datos en el frontend después de guardar
        const updatedData = data.map(item =>
          item.x === selectedMonth ? { ...item, y: updatedCount } : item
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
      <ResponsiveLine
        data={[
          {
            id: 'Profesionales',
            data: data
          }
        ]}
        theme={{
          axis: {
            domain: { line: { stroke: colors.grey[100] } },
            legend: { text: { fill: colors.grey[100] } },
            ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
          },
          legends: { text: { fill: colors.grey[100] } },
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        colors={colors.pinkAccent[500]}  // Color de la línea
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Meses',
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
        tooltip={({ point }) => (
          <div style={{
            backgroundColor: colors.grey[900],
            padding: '5px 10px',
            borderRadius: '4px',
            color: colors.grey[100]
          }}>
            <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted} profesionales
          </div>
        )}
      />

      {/* Selector para elegir el mes, campo para la cantidad y botón de guardar */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto' }}>
        <FormControl style={{ marginRight: '20px', width: '200px' }}>
          <InputLabel id="month-select-label">Seleccionar Mes</InputLabel>
          <Select
            labelId="month-select-label"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Seleccionar Mes"
            fullWidth
          >
            {data.map(item => (
              <MenuItem key={item.x} value={item.x}>
                {item.x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Número de Profesionales"
          type="number"
          variant="outlined"
          value={newCount[selectedMonth] || ''}
          onChange={handleCountChange}
          style={{ marginRight: '20px', width: '200px' }}
          InputLabelProps={{
            style: { fontSize: '12px', lineHeight: '3.4', whiteSpace: 'normal' }, // Ajustes de la etiqueta
          }}
        />

        <Button
          variant="contained"
          onClick={handleSave}
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
    </div>
  );
};

export default LineChart;

