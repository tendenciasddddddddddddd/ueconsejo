import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      fecha: {
        type: String,
        required: true,
      },
      fdocente: 
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      doc: String,
      nombre : String,
      materia: String,
      codigo: String,
      descripcion: String,
      icono: String,
      estudiantes: [
        {
          usuario:{
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          name: String,
          email: String,
        }
      ],
      //-----------------------------------------------------TASK----------------
      task :[{
        nombre: String,
        descripcion: String,
        archivo : String,
        finicio: String,
        ffin: String,
        estado: String,
        entrega : [
          {
          idUser : {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          nombres : String,
          link : String,
          nota : String
        }]
      }],
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Aulavirtual", nivelSchema);