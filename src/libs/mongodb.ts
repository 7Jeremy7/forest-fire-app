import mongoose, { ConnectOptions } from "mongoose";

const uri: string = "mongodb+srv://jeremy:admin123@cluster0.sdnm8.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions: ConnectOptions = {
    serverApi:{
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

let isConnected: boolean = false;

export const connectToDatabase = async (): Promise<typeof mongoose> =>{
    if(isConnected){
        console.log("Ya existe una conexión activa con la base de datos");
        return mongoose;
    }

    try{
        await mongoose.connect(uri, clientOptions);
        isConnected = true;
        console.log("Conexión con la base de datos establecida")
        return mongoose;
    }catch (error){
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    }
}