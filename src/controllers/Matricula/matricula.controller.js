import Matriculas from "../../models/Matricula/Matriculas";
import Nivel from "../../models/Gestion/Nivel";

export const createMatriculas = async (req, res) => {
  try {
    let array = req.body;
    const docs = [];
    const duplicados = [];
    const modalidad = req.query.modalidad;
    let contador =0;
    let aux = 0;
    const ultimaMatricula = await Matriculas.findOne({
      typo: {
        $in: [modalidad],
      },
    }).sort({ $natural: -1 });
    let resultUltimaMatricula = 0;
    if (ultimaMatricula) {
      resultUltimaMatricula = parseInt(ultimaMatricula.nmatricula);
    }
     for (let i = 0; i < array.length; i++) {
       const ifmatricula = await Matriculas.findOne({
        // academico: array[i].academico,
         fkestudiante: array[i].fkestudiante,
       });
       if (ifmatricula) {
         duplicados.push(array[i]);
       } else {
         contador++;
         aux = resultUltimaMatricula + contador ;
         array[i].nmatricula =  aux ;
         array[i].folio = Math.ceil(aux / 2);
         docs.push(array[i]);
       }
     }
     if (docs) {
      const options = { ordered: true };
      await Matriculas.insertMany(docs, options);
    }
    return res.status(200).json({
      duplicados,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem" });
  }
};

export const getMatriculas = async (req, res) => {
  //SIRVE EL LISTADO PARA [CONSOLIDADO, ]

  const matriculas = await Matriculas.find()
    .lean()
    .select({ curso: 1, typo: 1 })
    .populate("fkestudiante", "fullname cedula email fkparroquia sexo")
    .populate("fknivel", "nombres");

  return res.json(matriculas);
};

export const getReportes = async (req, res) => {
  //RESUELVE LOS REPORTES
  const version = req.query.m;
  const curs = req.query.c;
  const matriculas = await Matriculas.find({
    typo: {
      $in: [version],
    },
    fknivel: {
      $in: [curs],
    },
  })
    .lean()
    .select({ curso: 1, nombre: 1 });

  return res.json(matriculas);
};

export const getInfoMat = async (req, res) => {
  //NO RESULEV NADA
  if (req.query.h) {
    const academic = req.query.h;
    const version = req.query.m;
    const curs = req.query.c;

    const matriz = await Matriculas.find({
      academico: {
        $in: [academic],
      },
      typo: {
        $in: [version],
      },
      fknivel: {
        $in: [curs],
      },
    })
      .populate("fkestudiante", "nombres apellidos foto")
      .populate("fknivel", "nombre");
    const coleccion = {
      matriculados: matriz,
    };
    return res.json(coleccion);
  }
  const modalidad = req.query.v; // Asegúrate de parsear el límite a número
  const periodo = req.query.p;
  const mat = await Matriculas.findOne({
    typo: {
      $in: [modalidad],
    },
    estado: {
      $in: ["1"],
    },
    academico: {
      $in: [periodo],
    },
  }).sort({ createdAt: -1 });
  const coleccion = {
    num: 1,
    infor: mat,
  };
  return res.json(coleccion);
};

export const getListaMatricula = async (req, res) => {
  //RESUELVE LISTA DE MATRICULA [ELIMINAR, PARALELOS]
  const curso = req.query.curso;
  const mat = await Matriculas.find({
    fknivel: {
      $in: [curso],
    },
  })
    .lean()
    .select({ curso: 1, nombre: 1 });
  const coleccion = {
    matriculados: mat,
  };
  return res.json(coleccion);
};

export const getMatriculaFolio = async (req, res) => {
  //RESUELVE NUMERO DE MATRICULA Y FOLIO
  const modalidad = req.query.v;
  const mat = await Matriculas.findOne({
    typo: {
      $in: [modalidad],
    },
  }).sort({ createdAt: -1 });
  const coleccion = {
    num: 1,
    infor: mat,
  };
  return res.json(coleccion);
};

export const getMatriculasById = async (req, res) => {
  const { matriculaId } = req.params;

  const niveles = await Matriculas.findById(matriculaId)
    .populate("fknivel", "nombre")
    .populate("academico", "nombre");
  res.status(200).json(niveles);
};

//-----------------------------------------------------------PARALELOS [ADMINISTRADOR]
export const updateMatriculasById = async (req, res) => {
  try {
    let cadenaId = req.params.matriculaId;
    const array = cadenaId.split(",");
    const updatedMateria = await Matriculas.updateMany(
      { _id: { $in: array } },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedMateria);
  } catch (e) {
    return res.status(500).json();
  }
};

//-----------------------------------------------------------ELIMINAR MATRICULA CON MULTIPLES
export const deleteMatriculasById = async (req, res) => {
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
};

//--------------------------------REPORTE DE ESTUDIANTES-----------------------------------

export const getMatriculasNotaBykEY = async (req, res) => {
  try {
    const { matriculaId } = req.params;
    const matricula = await Matriculas.findOne({ fkestudiante: matriculaId })
      .populate("fknivel", "nombre")
      .populate("academico", "nombre");
    res.status(200).json(matricula);
  } catch (error) {
    res.status(500).json({ message: "No mat found" });
  }
};
