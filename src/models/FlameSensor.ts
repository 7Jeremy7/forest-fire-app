import mongoose, { Schema, model } from "mongoose";

const FlameSensorSchema = new Schema({
  valor: { type: Number, required: true },
});

export default mongoose.models.FlameSensor || model("FlameSensor", FlameSensorSchema);
