import { Schema, model } from "mongoose";

const provinciasSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      estado: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Provincias", provinciasSchema);