import Matriculas from "../../models/Matricula/Matriculas";
import MigracionMatricula from "../../models/Matricula/MigracionMatricula";

//-------------------CLONAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------

export const createMigracionMatricula = async (req,res)=>{
    Matriculas.find().then((colecciones) => {
      colecciones.forEach((array) => {
        const nuewData = MigracionMatricula(array);
        nuewData.isNew = true;  
        nuewData.save();
       
      });
    });
    return res.json('Hecho');
}
//-----------------------------------------------------------ELIMINAR MATRICULA CON MULTIPLES
export const deleteMigracionesById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await MigracionMatricula.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
};
//-------------------ELIMINAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------

export const deleteMatriculasMany = async (req,res)=>{
  try {
    await Matriculas.deleteMany();
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}


export const getQueryAll = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await MigracionMatricula.countDocuments();
  const paginas = Math.ceil(total/limit);
  const usuarios = await MigracionMatricula.find({}).skip((limit * skip)-limit).limit(limit).populate('academico','nombre').populate('fknivel','nombre');
  const coleccion = {
    usuarios: usuarios,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}

//--CONSULTAMOS POR NOMBRE LAS MATRICULAS DE HISTORY
export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await MigracionMatricula.find({nombre: { '$regex' : querys, "$options": "i" } }).populate('academico','nombre').populate('fknivel','nombre');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  } 
};

export const getByIdOfCourseAndPeriod = async (req, res) => {
  //RESUELVE LOS REPORTES
  const periodoId = req.query.periodoId;
  const courseId = req.query.courseId;
  const matriculas = await MigracionMatricula.find({
    academico: {
      $in: [periodoId],
    },
    fknivel: {
      $in: [courseId],
    },
  })
    .lean()
    .populate('academico','nombre').populate('fknivel','nombre');

  return res.json(matriculas);
};

export const getByIdOfPeriodo = async (req, res) => {
  //RESUELVE LOS REPORTES
  const periodoId = req.query.periodoId;
  const matriculas = await MigracionMatricula.find({
    academico: {
      $in: [periodoId],
    },
  })
    .lean()
    .populate('academico','nombre').populate('fknivel','nombre num');

  return res.json(matriculas);
};