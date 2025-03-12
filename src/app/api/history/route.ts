import { connectToDatabase } from "@/libs/mongodb";
import { client } from "@/libs/mqttClient";
import FlameSensor from "@/models/FlameSensor";
import GpsData from "@/models/GpsData";
import Humedad from "@/models/Humedad";
import HumoSensor from "@/models/HumoSensor";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    // Conexión a la base de datos
    await connectToDatabase();
    await client;

    // Obtener los datos de cada colección
    const humoData = await HumoSensor.find();
    const flameSensorData = await FlameSensor.find();
    const tempHumidityData = await Humedad.find();
    const gpsInfo = await GpsData.find();

    // Respuesta con los datos de los tópicos
    return NextResponse.json(
      {
        humo: humoData,
        flameSensor: flameSensorData,
        tempHumidity: tempHumidityData,
        gpsData: gpsInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener datos de los tópicos:", error);

    // Respuesta en caso de error
    return NextResponse.json(
      {
        message: messages.error.defaultError,
        error,
      },
      { status: 500 }
    );
  }
}


