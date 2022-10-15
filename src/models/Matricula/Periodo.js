import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      estado: {
        type: String,
        default:1
      },
      typo: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Periodo", nivelSchema);