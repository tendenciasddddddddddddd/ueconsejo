import { Schema, model } from "mongoose";

const paisesSchema = new Schema(
    {
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