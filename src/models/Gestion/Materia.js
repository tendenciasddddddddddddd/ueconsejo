import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      descripcion: {
        type: String,
      },
      icono : String,
      estado: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Materia", nivelSchema);