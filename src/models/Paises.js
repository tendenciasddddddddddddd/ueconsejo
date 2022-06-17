import { Schema, model } from "mongoose";

const paisesSchema = new Schema(
    {
      nombre: String,
      estado: Boolean,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Paises", paisesSchema);