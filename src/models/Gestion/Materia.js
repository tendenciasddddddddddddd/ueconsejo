import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      area: {
        type: String,
      },
      estado: {
        type: String,
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Materia", nivelSchema);