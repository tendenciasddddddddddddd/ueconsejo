import { Schema, model } from "mongoose";

const paisesSchema = new Schema(
    {
      logo: String,
      unidadeducativa: String,
      ubicacion: String,
      telefono: String,
      direccion: String,
      rector: String,
      vicerector: String,
      secretario: String,
      inspector: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Configure", paisesSchema);