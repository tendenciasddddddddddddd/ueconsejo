import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      num: {
        type: String,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
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