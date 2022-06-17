import { Schema, model } from "mongoose";

const etniasSchema = new Schema(
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
  
  export default model("Etnias", etniasSchema);