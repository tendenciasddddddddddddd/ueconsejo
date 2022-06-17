import { Schema, model } from "mongoose";

const cantonesSchema = new Schema(
    {
       // ---------------bloque1
        telefonofijo: String,
        calles: String,
        referencia: String,
        codigo: String,
        numeric: String,
        nombrec: String,
        edad: String,
        nacimineto: String,
      //---------------bloque2
      centroAtencio: String,
      estadoEstudiant:String,
       tipoDocumnt: String,
       estadoCivi: String,
      tiposangre:String,
      operado: String,
      carnet: String,
      parentesc : String,
       discapacidad : String,
      //---------------TIPO MAS DATOS
      detalles: 
      {
        type: Schema.Types.ObjectId,
         ref: "User",
      },

    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("UserDetalles", cantonesSchema);