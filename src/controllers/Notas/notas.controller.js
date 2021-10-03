import Matriculas from "../../models/Matricula/Matriculas";

//---------------------------------------------------------SIRVE LISTA DE ESTUDIANTES A CALIFICAR [DOCENTES, ]
export const getMatriculaNota = async (req, res) => {
    const idCurso = req.query.curso;
    const distributivo = await Matriculas.find({
        fknivel:{$in:[idCurso]},
    },{'curso': 1, 'nombre': 1, 'calificaciones.materia':1, 'calificaciones.notas.promedio':1,
    'calificaciones.notas.quimestre':1, 'calificaciones.promediof':1, 'calificaciones._id':1,}) //aqui se produjo el error de 
    .lean();
    return res.json(distributivo);
};


//---------------------------------------------------------ASUGNAR ASISTENCIAS  [DOCENTES, ]
export const getMatriculaAsistencia = async (req, res) => {
  const idCurso = req.query.curso;
  const distributivo = await Matriculas.find({
      fknivel:{$in:[idCurso]},
  })
  .select({curso: 1, nombre: 1});
  return res.json(distributivo);
};




//---------------------------------------------------------REVISAR NOTAS DE CADA ESTUSIANTES [ESTUDIANTES, ]  
export const getMatriculasNotaById = async (req,res)=>{
  try{
    const { matriculaId } = req.params;
    const matricula = await Matriculas.findOne({ fkestudiante: matriculaId })
    .populate('fknivel','nombres')
    .populate('academico','nombre');
      res.status(200).json(matricula);
  }catch(error){
    res.status(500).json({ message: "No mat found" });
  }
}


//-------------------------------------------------------REFORMA DE CALIFICACIONES -------------------------------------

export const createNotaArbol1ById = async (req,res)=>{
  await Matriculas.findByIdAndUpdate(
      req.params.matriculaId,
      { $push: { 'calificaciones': req.body.calificaciones} },
      {
        new: true,
      }
    );
    res.status(200).json('crearnote');
}

//------------------------------------- INSERTA LAS NOTAS

export const createNotaArbol2ById = async (req,res)=>{
  try{
    await Matriculas.updateOne(
      {'calificaciones._id': req.params.matriculaId},
      { $push: { 'calificaciones.$.notas': req.body.calificaciones.notas} },
      {
        new: true,
      }
    );
    res.status(200).json('crearnote');
  }catch(e){
    res.status(500).json({ message: "No mat found" });
  } 
}


//confirmar las notas---
export const createNotaArbol3ById = async (req,res)=>{
  console.log(req.body.calificaciones.promediof)
  try{
    await Matriculas.updateOne(
      {'calificaciones._id': req.params.matriculaId},
      { $set: { 'calificaciones.$.promediof': req.body.calificaciones.promediof} },
      {
        new: true,
      }
    );
    res.status(200).json('crearnote');
  }catch(e){
    console.log(e)
    res.status(500).json({ message: "No mat found" });
  } 
}