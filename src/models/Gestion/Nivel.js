import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      nombres: {
        type: String,
        required: true,
      },
      modalidad: String,
      estado: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Nivel", nivelSchema);