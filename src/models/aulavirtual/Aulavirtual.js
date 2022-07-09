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
        fechad : String,
        entrega : [
          {
          idUser : {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          link : String,
          nota : String,
          observar : String,
          comentario: String,
        }]
      }],
      examen : [{
        nombre: String,
        descripcion: String,
        startDate: String,
        endDate: String,
        time: String,
        createQuizz: String,
        randomize: Number, // para preguntas aleatorias
        intenAllowed: Number,
        security : String,
        check: Number,
        surveys : [{
          question : String,
          options : [{}],
          reqq : [],
          tipo: Number,
        }],
        answers: [{
          idUser: String,
          responses: [{}],
          puntage: String
        }]
      }]
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Aulavirtual", nivelSchema);