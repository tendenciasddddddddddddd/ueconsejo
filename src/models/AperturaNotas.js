import { Schema, model } from "mongoose";


const roleSchema = new Schema(
  {
    inicio: String,
    fin: String,
  },
  {
    versionKey: false,
  }
);

export default model("AperturaNotas", roleSchema);