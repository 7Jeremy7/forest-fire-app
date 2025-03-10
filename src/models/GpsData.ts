import mongoose, { Schema, Document } from 'mongoose'


export interface IGpsData extends Document{
    latitud?: number;
    longitud?: number;
    timestamp: Date; 
}


const GpsDataSchema = new Schema<IGpsData>({
    latitud: {type: Number, requied: false},
    longitud: {type: Number, required: false },
    timestamp: { type: Date, default: Date.now },
}); 


export default mongoose.models.GpsData || mongoose.model<IGpsData>('GpsData', GpsDataSchema);