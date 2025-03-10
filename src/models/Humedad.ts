import mongoose, { Schema, model } from "mongoose";

const HumedadSchema = new Schema({
  temperatura: { type: Number, required: true },
  humedad: { type: Number, required: true },
});

export default mongoose.models.Humedad || model("Humedad", HumedadSchema);
