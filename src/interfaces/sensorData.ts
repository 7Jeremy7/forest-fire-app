export interface FlameSensor {
    valor: number;
  }
  
  export interface HumoSensor {
    valor: number;
  }
  
  export interface Humedad {
    temperatura: number;
    humedad: number;
  }

  export interface GpsData{
    latitud?: number; // Opcional
    longitud?: number; 
    timestamp: Date;
  }
  
  export interface DataResponse {
    flameSensor: FlameSensor[];
    humo: HumoSensor[];
    tempHumidity: Humedad[];
    gpsData: GpsData[];
  }
  