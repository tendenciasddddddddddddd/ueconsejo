import { Schema, model } from "mongoose";

const cantonesSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      estado: String,
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