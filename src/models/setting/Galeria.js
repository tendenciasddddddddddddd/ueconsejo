import { Schema, model } from "mongoose";

const galeriaSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Galeria", galeriaSchema);