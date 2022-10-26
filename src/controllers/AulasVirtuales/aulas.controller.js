import Aulavirtual from "../../models/aulavirtual/Aulavirtual";


export const createAulasVirtuales = async (req,res)=>{
    const { fecha, fdocente, doc, nombre, materia, codigo, descripcion, icono} = req.body;
    try {
        const newAula = new Aulavirtual({
          fecha, 
          fdocente, 
          doc, 
          nombre, 
          materia, 
          codigo, 
          descripcion,
          icono
        });
        const AulaSaved = await newAula.save();
        res.status(201).json(AulaSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
}

//----------------------------RESULEVE LISTA DE CURSOS EN [DOCENTES]
export const getAulasVirtuales = async (req,res)=>{
  try {
    const idDocente = req.query.id;
    const matriculas = await Aulavirtual.find({
      fdocente: {
        $in:[idDocente]
      },
    }).lean().select({nombre: 1, materia: 1, icono: 1, fecha:1})
  
    return res.json(matriculas);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//----------------------------ELIMINAR AULAS VIRTUALES [DOCENTES]
export const deleteAulaById = async (req,res)=>{
  try {
    let cadenaId = req.params.aulaId;
    const array = cadenaId.split(",");
    await Aulavirtual.deleteMany({
      _id: {
        $in: array,
      },
    });
    // code 200 is ok too
    res.status(200).json();
  } catch (error) {
    res.status(500).json('error del servidor');
  }
}

//TRAEMOS AULA SOLO EN NOMBRE RESUELVE [DOCENTE => AULA-PRINCIPAL]

export const getAulasMainById = async (req,res)=>{
  try{
    const { aulaId } = req.params;
    const aulas = await Aulavirtual.findById(aulaId).lean().select({materia: 1, nombre: 1, estudiantes: 1});
    res.status(200).json(aulas);
  }
  catch(err){
    res.status(500).json('error del servidor');
  }
}

//TRAEMOS AULA PARA EL DOCENTES

export const getAulassById = async (req,res)=>{
  try{
    const { aulaId } = req.params;
    const aulas = await Aulavirtual.findById(aulaId).lean();
    res.status(200).json(aulas);
  }
  catch(err){
    res.status(500).json('error del servidor');
  }
}

//PARA MATRICULA DE ESTUDIANTES OSEA TRE PARA QUE SE MATRICULE 
export const getAllAulasEstu = async (req,res)=>{
  try {
    const matriculas = await Aulavirtual.find().lean().select({nombre: 1, materia: 1, doc: 1, codigo: 1, estudiantes: 1, icono: 1, fecha:1})
    return res.json(matriculas);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//EMPUJAR USUARIO O ESTUDIANTE A CADA AARREGLO

export const createAulaById = async (req,res)=>{
  try {
    await Aulavirtual.findByIdAndUpdate(
      req.params.aulaId,
      { $push: { 'estudiantes': req.body.estudiantes} },
      {
        new: true,
      }
    );
    res.status(200).json(req.params.aulaId);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//------------------------------------- ELIMINAR ESTUDIANTES DEL CURSO [DOCENTE, ]

export const deleteUserById = async (req, res) => {
  try {
    let cadenaId = req.body;
    await Aulavirtual.updateOne(
      { _id: req.params.taskId },
      { $pull: { estudiantes : { _id: cadenaId } } },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};