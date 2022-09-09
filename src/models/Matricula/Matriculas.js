import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
    {
      fecha: {
        type: String,
        required: true,
      },
      fkestudiante: 
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      nombre : String,
    
      fknivel: 
      {
        type: Schema.Types.ObjectId,
        ref: "Nivel",
      },
      academico: 
      {
        type: Schema.Types.ObjectId,
        ref: "Academicos",
      },
      nmatricula : Number,
      folio : Number,
      curso : String,
      estado: String,
      
      //--------------------------REFORMAR CALIFICACIONES
      calificaciones : [{
        docente : String,
        materia : String,
        sumaf: String,
        promediof : String,
        suple: String,
        reme: String,
        gracia: String,
        pfinal : String,
        notas : [{}]
      }],
     
      asistencias:[{
        fecha: String,
        materia: String,
        isAsiste : String,
      }]
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Matriculas", nivelSchema);