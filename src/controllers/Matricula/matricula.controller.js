import Matriculas from "../../models/Matricula/Matriculas";
import Nivel from "../../models/Gestion/Nivel"


export const createMatriculas = async (req,res)=>{
  
    const { fecha, fkestudiante,  fknivel, nmatricula, nombre, folio, curso, estado, typo, academico} = req.body;
    try {
        const newPeriodo = new Matriculas({
          fecha, 
          fkestudiante,  
          fknivel, 
          nmatricula,
          nombre, 
          folio, 
          curso,
          estado,
          typo,
          academico
        });
    
        const PeriodoSaved = await newPeriodo.save();
    
        res.status(201).json(PeriodoSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}



export const getMatriculas = async (req,res)=>{ //SIRVE EL LISTADO PARA [CONSOLIDADO, ]

  const matriculas = await Matriculas.find().lean().select({curso: 1,typo :1}).populate('fkestudiante','fullname cedula email fkparroquia sexo')
  .populate('fknivel','nombres');
  
  return res.json(matriculas);
}

export const getReportes = async (req,res)=>{ //RESUELVE LOS REPORTES
  const version = req.query.m;
  const curs = req.query.c;
  const matriculas = await Matriculas.find({
    typo: {
      $in:[version]
    },
    fknivel: {
      $in:[curs]
    }
  }).lean().select({curso: 1}).populate('fkestudiante','fullname');

  return res.json(matriculas);
}

export const getInfoMat = async (req,res)=>{
  if(req.query.h){
    const academic = req.query.h;
    const version = req.query.m;
    const curs = req.query.c;

    const matriz = await Matriculas.find({
      academico: {
        $in:[academic]
      },
      typo: {
        $in:[version]
      },
      fknivel: {
        $in:[curs]
      }
     }).populate('fkestudiante','nombres apellidos foto')
     .populate('fknivel','nombres');
     console.log('entro 1 ')
     const coleccion = {
       matriculados : matriz,
     }
     return res.json(coleccion);
  }
  const modalidad = req.query.v; // Asegúrate de parsear el límite a número
  const periodo = req.query.p;
  const mat = await Matriculas.findOne({
    typo: {
      $in:[modalidad]
    },
    estado : {
      $in:["1"]
    },
    academico: {
      $in:[periodo]
    }
  }).sort({createdAt:-1});
  const coleccion = {
    num: 1,
    infor : mat
  }
  return res.json(coleccion);
}


export const getListaMatricula = async (req,res)=>{  //RESUELVE LISTA DE MATRICULA [ELIMINAR, PARALELOS]
  const modalidad = req.query.modalidad;
  const curso = req.query.curso;
    const mat = await Matriculas.find({
      typo : {
        $in:[modalidad]
      },
      fknivel : {
        $in:[curso]
      }
    }).select({curso: 1, nombre: 1}).populate('fknivel','nombres');
    const coleccion = {
      matriculados : mat
    }
    return res.json(coleccion);
}


export const getMatriculaFolio = async (req,res)=>{  //RESUELVE NUMERO DE MATRICULA Y FOLIO
  const modalidad = req.query.v;
    const mat = await Matriculas.findOne({
      typo : {
        $in:[modalidad]
      }
    }).sort({createdAt:-1});
    const coleccion = {
      num: 1,
      infor : mat
    }
    return res.json(coleccion);
}


export const getMatriculasById = async (req,res)=>{
    const { matriculaId } = req.params;

  const niveles = await Matriculas.findById(matriculaId)
  .populate('fkestudiante','nombres apellidos')
  .populate('fknivel','nombres')
  .populate('academico','nombre');
  res.status(200).json(niveles);
    
}

export const updateMatriculasById = async (req,res)=>{
   
    const updatedMateria = await Matriculas.findByIdAndUpdate(
        req.params.matriculaId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedMateria);
}


//-----------------------------------------------------------ELIMINAR MATRICULA CON MULTIPLES
export const deleteMatriculasById = async (req,res)=>{
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Matriculas.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}


//--------------------------------REPORTE DE ESTUDIANTES-----------------------------------

export const getMatriculasNotaBykEY = async (req,res)=>{
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