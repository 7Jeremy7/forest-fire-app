import mqtt from "mqtt";
import { connectToDatabase } from "@/libs/mongodb"; // Reutilizando el archivo de conexión
import HumoSensor from "@/models/HumoSensor";
import FlameSensor from "@/models/FlameSensor";
import Humedad from "@/models/Humedad";
import GpsData from "@/models/GpsData";

// Conexión inicial a MongoDB
connectToDatabase();

// Configuración del cliente MQTT
export const client = mqtt.connect("mqtts://a060982f6bdc4f5795681acdea5fd86d.s2.eu.hivemq.cloud", {
  port: 8883,
  username: "flama",
  password: "Flama1234",
});

client.on("connect", () => {
  console.log("Conectado al broker MQTT");
  client.subscribe(["humo", "flame_sensor", "temp_humidity", "gps_data"], (err) => {
    if (err) {
      console.error("Error al suscribirse:", err);
    } else {
      console.log("Suscripción exitosa a los tópicos.");
    }
  });
});

client.on("message", async (topic, message) => {
  const data = message.toString();
  console.log(`Mensaje recibido del tópico ${topic}: ${data}`);

  try {
    if (topic === "humo") {
      await HumoSensor.create({ valor: parseFloat(data) });
    } else if (topic === "flame_sensor") {
      await FlameSensor.create({ valor: parseFloat(data) });
    } else if (topic === "temp_humidity") {
      const parsed = JSON.parse(data);
      await Humedad.create({
        temperatura: parseFloat(parsed.temperaturaC),
        humedad: parseFloat(parsed.humedad),
      });
    } else if (topic === "gps_data") {
      const parsed = JSON.parse(data);
      await GpsData.create({
        latitud: parseFloat(parsed.latitud),
        longitud: parseFloat(parsed.longitud),
      });
    }
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
  }
});
  