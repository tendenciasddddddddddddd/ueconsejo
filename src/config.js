import { config } from "dotenv";
config();
//mongodb+srv://steban_wm:Medid100.@cluster0.xee5y.mongodb.net/apicolegios?retryWrites=true&w=majority
//mongodb://localhost/apicompany //sistema-educativo
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/sistema-educativo",
  PORT: process.env.PORT || 3000,
  SECRET: 'uem cesar anotonio mosquera'
};