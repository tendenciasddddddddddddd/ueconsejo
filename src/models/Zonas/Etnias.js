import { Schema, model } from "mongoose";

const etniasSchema = new Schema(
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
  
  export default model("Etnias", etniasSchema);