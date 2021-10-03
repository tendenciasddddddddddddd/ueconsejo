import { Schema, model } from "mongoose";

const cantonesSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      estado: String,
      fkCanton: String,
      //---------------TIPO MAS DATOS
     cant: 
        {
          type: Schema.Types.ObjectId,
          ref: "Cantones",
        },
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Parroquias", cantonesSchema);