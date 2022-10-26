import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      num: {
        type: String,
        unique: true,
      },
      nombre: {
        type: String,
        unique: true,
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
  
  export default model("Nivel", nivelSchema);