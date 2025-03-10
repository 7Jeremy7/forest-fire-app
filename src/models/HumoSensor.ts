import mongoose, { Schema, model } from "mongoose";

const HumoSensorSchema = new Schema({
  valor: { type: Number, required: true },
});

export default mongoose.models.HumoSensor || model("HumoSensor", HumoSensorSchema);
