import { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveChoropleth } from '@nivo/geo';
import { useTheme, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { tokens } from '../theme';
import { geoFeatures } from '../data/mockGeoFeatures';

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [newCount, setNewCount] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(''); // País seleccionado en el selector dinámico

  // Obtener los datos del gráfico desde el backend
  useEffect(() => {
    axios.get('https://hm-backend-production.up.railway.app/api/geographyChart/geography-chart-data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
  }, []);

  // Manejar cambio de país seleccionado
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Manejar cambios en los campos de entrada
  const handleChange = (country, value) => {
    setNewCount({
      ...newCount,
      [country]: value,
    });
  };

  // Guardar cambios en el backend
  const handleSave = (country, region) => {
    const updatedCount = newCount[country];
    if (updatedCount) {
      axios.post('https://hm-backend-production.up.railway.app/api/geographyChart/geography-chart-data-update', {
        country,
        region,
        professionalsCount: updatedCount,
      })
        .then(() => {
          const updatedData = data.map(item =>
            item.country === country && item.region === region
              ? { ...item, professionalsCount: updatedCount }
              : item
          );
          setData(updatedData);
        })
        .catch(error => {
          console.error('Error al guardar el dato', error);
        });
    }
  };

  return (
    <div style={{ width: '100%', height: '400px', marginBottom: '20px'}}>
      {/* Contenedor fijo para el marco y leyenda */}
      <div style={{ position: 'relative', height: '100%'}}>
        {/* Mapa con ResponsiveChoropleth */}
        <ResponsiveChoropleth
          data={data}
          theme={{
            axis: {
              domain: { line: { stroke: colors.grey[100] } },
              legend: { text: { fill: colors.grey[100] } },
              ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
            },
            legends: { text: { fill: colors.grey[100] } },
          }}
          features={geoFeatures.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          domain={[0, 1000000]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={isDashboard ? 40 : 150}
          projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          borderWidth={1.5}
          borderColor="#ffffff"
          legends={!isDashboard ? [{
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: colors.grey[100],
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [{
              on: "hover",
              style: { itemTextColor: "#ffffff", itemOpacity: 1 },
            }],
          }] : undefined}
          tooltip={(e) => {
            const countryData = data.find(item => item.country === e.feature.properties.name);
            const professionalsCount = countryData ? countryData.professionalsCount : 'Sin datos';
            return (
              <div style={{
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '5px',
                borderRadius: '4px',
                fontSize: '24px',
              }}>
                <strong>{e.feature.properties.name}</strong><br />
                Profesionales: {professionalsCount}
              </div>
            );
          }}
        />
      </div>

      {/* Selector dinámico para países */}
      <FormControl style={{ margin: '20px', minWidth: '200px' }}>
        <InputLabel>Seleccionar País</InputLabel>
        <Select
          value={selectedCountry}
          onChange={handleCountrySelect}
        >
          {data.map(item => (
            <MenuItem key={item.country} value={item.country}>
              {item.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Campo de entrada y botón para el país seleccionado */}
      {selectedCountry && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label={`Profesionales en ${selectedCountry}`}
            type="number"
            variant="outlined"
            value={newCount[selectedCountry] || data.find(item => item.country === selectedCountry)?.professionalsCount || ''}
            onChange={(e) => handleChange(selectedCountry, e.target.value)}
            style={{ marginBottom: '10px', width: '200px' }}
          />
          <Button
            variant="contained"
            onClick={() => {
              const countryData = data.find(item => item.country === selectedCountry);
              if (countryData) {
                handleSave(selectedCountry, countryData.region);
              }
            }}
            style={{
              backgroundColor: colors.greenAccent[500],
              color: '#fff',
              transition: 'background-color 0.3s ease',
            }}
          >
            Guardar
          </Button>
        </div>
      )}
    </div>
  );
};

export default GeographyChart;
