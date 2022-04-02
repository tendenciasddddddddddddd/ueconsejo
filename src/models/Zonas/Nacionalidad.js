import { Schema, model } from "mongoose";

const provinciasSchema = new Schema(
    {
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
  
  export default model("Nacionalidad", provinciasSchema);