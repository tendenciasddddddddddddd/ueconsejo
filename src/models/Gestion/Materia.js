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
      estado: {
        type: String,
        default:1
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Materia", nivelSchema);