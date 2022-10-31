import { Schema, model } from "mongoose";

const paisesSchema = new Schema(
    {
      web: String,
      movil: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Apps", paisesSchema);