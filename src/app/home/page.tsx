'use client';

import React, { useState, useEffect } from 'react';
import { LineChart } from '@/Components/line/LineChart';
import { DataResponse } from '@/interfaces/sensorData';

export default function HomePage() {
  const [data, setData] = useState<DataResponse>({
    flameSensor: [],
    humo: [],
    tempHumidity: [],
    gpsData: [],
  });

  const fetchData = async () => {
    try {
      const res = await fetch('https://forest-fire-app-production.up.railway.app/api/history');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: DataResponse = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Actualización de datos
    return () => clearInterval(intervalId);
  }, []);

  const lastGpsData = data?.gpsData && data.gpsData.length > 0 ? data.gpsData[data.gpsData.length - 1] : null;


  // Obtener los últimos valores de cada sensor
  const lastHumo = data.humo.length > 0 ? data.humo[data.humo.length - 1].valor : null;
  const lastFlama = data.flameSensor.length > 0 ? data.flameSensor[data.flameSensor.length - 1].valor : null;
  const lastTemp = data.tempHumidity.length > 0 ? data.tempHumidity[data.tempHumidity.length - 1].temperatura : null;
  const lastHumedad = data.tempHumidity.length > 0 ? data.tempHumidity[data.tempHumidity.length - 1].humedad : null;

  // Verificación de alertas
  const humoAlerta = lastHumo !== null && lastHumo >= 410;
  const flamaAlerta = lastFlama !== null && lastFlama <= 500;
  const tempAlerta = lastTemp !== null && lastTemp >= 25;
  const humedadAlerta = lastHumedad !== null && lastHumedad <= 70;

  // Contar cuántos sensores están en estado de alerta
  const alertCount = [humoAlerta, flamaAlerta, tempAlerta, humedadAlerta].filter(Boolean).length;

  let alertaColor = 'bg-green-500'; // Por defecto verde (Sin incendio)
  let alertaTexto = '✅ No hay incendio detectado';

  if (alertCount >= 4) {
    alertaColor = 'bg-red-500'; // Rojo (Incendio confirmado)
    alertaTexto = '🔥 INCENDIO CONFIRMADO 🔥';
  } else if (alertCount >= 2) {
    alertaColor = 'bg-yellow-500'; // Amarillo (Posible incendio)
    alertaTexto = '⚠️ POSIBLE INCENDIO ⚠️';
  }

  return(
    <div  style={{ width: "90%" }} >
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
        <h1  style={{ paddingTop: '20px' }} className="text-center text-2xl font-bold col-span-2">Monitoreo</h1>
        {/* Cuadro de alerta */}
        <div className={`col-span-2 flex justify-center p-4 text-white font-bold text-xl rounded-lg shadow-md ${alertaColor}`}>
          {alertaTexto}
        </div>
        {/* Cuadro con la dirección GPS */}
        <div className="col-span-2 flex justify-center">
          <div style={{ width: "100%", height: "95%" }} className="black text-white p-5 rounded-lg shadow-md w-64 border border-white">
            <h2 className="text-lg font-semibold text-center mb-2">Ubicación GPS</h2>
            {lastGpsData ? (
              <div className="text-sm flex flex-col gap-2">
                <p className="text-left"><span className="font-bold">Latitud:</span> {lastGpsData.latitud ?? 'N/A'}</p>
                <p className="text-left"><span className="font-bold">Longitud:</span> {lastGpsData.longitud ?? 'N/A'}</p>
                <button 
                  className="mt-2 p-2 text-white font-bold rounded hover:text-gray-300"
                  onClick={() => window.open(`https://www.google.com/maps?q=${lastGpsData.latitud},${lastGpsData.longitud}`, '_blank')}
                >
                  Ir a la ubicación
                </button>
              </div>
            ) : (
              <p className="text-left">No hay datos de GPS disponibles</p>
            )}
          </div>
        </div>
        {/* Gráficos en columna en pantallas pequeñas y más grandes en PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ">
          <div className="mb-8 w-full ">
            <LineChart
              data={data.humo.map((item) => item.valor)}
              label={`Sensor de Humo (${data.humo.length > 0 ? data.humo[data.humo.length - 1].valor : 'N/A'})ppm`}
              color="rgb(255, 255, 255)"
              labelColor="white"
            />
          </div>
          <div className="mb-2 w-full h-50">
            <LineChart
              data={data.flameSensor.map((item) => 500 - item.valor)}
              label={`Sensor de Flama (${data.flameSensor.length > 0 ? data.flameSensor[data.flameSensor.length - 1].valor : 'N/A'})`}
              color="rgba(255, 99, 132, 1)"
              labelColor="rgb(255, 99, 132)"
            />
          </div>
          <div className="mb-8 w-full h-50">
  <LineChart
    data={data.tempHumidity.map((item) => item.humedad)}
    label={`Humedad (${data.tempHumidity.length > 0 ? data.tempHumidity[data.tempHumidity.length - 1].humedad : 'N/A'})%`}
    color="rgba(75, 192, 192, 1)"
    labelColor="rgb(75, 192, 192)"
  />
</div>

<div className="mb-8 w-full h-50">
  <LineChart
    data={data.tempHumidity.map((item) => item.temperatura)}
    label={`Temperatura (${data.tempHumidity.length > 0 ? data.tempHumidity[data.tempHumidity.length - 1].temperatura : 'N/A'})°C`}
    color="rgba(255, 206, 86, 1)"
    labelColor="rgb(255, 206, 86)"
  />
</div>
        </div>
      </div>
    </div>
  );
  
  
}

