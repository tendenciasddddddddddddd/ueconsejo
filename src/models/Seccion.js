import { Schema, model } from "mongoose";


const roleSchema = new Schema(
  {
    nombre: String,
    fecha: String,
    identificador: String,//ID DEL CLIENTE
    
  },
  {
    versionKey: false,
  }
);

export default model("Seccion", roleSchema);