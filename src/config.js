import { config } from "dotenv";
config();
//mongodb://localhost/sistema-educativo

//mongodb+srv://steban:Medid100.@serverlessinstance0.0l8ym.mongodb.net/uehuaca?retryWrites=true&w=majority
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/sistema-educativo",
  PORT: process.env.PORT || 4000,
  SECRET: 'unidad-educativa-huaca'
};