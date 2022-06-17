import { Schema, model } from "mongoose";

const cantonesSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      estado: {
        type: String,
        default:1
      },
      fkProvincia: String,
      //---------------TIPO MAS DATOS
     prov: 
        {
          type: Schema.Types.ObjectId,
          ref: "Provincias",
        },

    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Cantones", cantonesSchema);