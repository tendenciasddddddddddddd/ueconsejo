import { Schema, model } from "mongoose";

export const ROLES = ["Admin", "Estudiante","Docente","Vicerrector","Inspector"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);