import Matriculas from "../../models/Matricula/Matriculas";

export const createMatriculas = async (req, res) => {
  try {
    let array = req.body;
    const docs = [];
    const duplicados = [];
    let contador = 0;
    let aux = 0;
    const ultimaMatricula = await Matriculas.findOne().sort({ $natural: -1 });
    let resultUltimaMatricula = 0;
    if (ultimaMatricula) {
      resultUltimaMatricula = parseInt(ultimaMatricula.nmatricula);
    }
    for (let i = 0; i < array.length; i++) {
      const ifmatricula = await Matriculas.findOne({
        fkestudiante: array[i].fkestudiante,
      });
      if (ifmatricula) {
        duplicados.push(array[i]);
      } else {
        contador++;
        aux = resultUltimaMatricula + contador;
        array[i].nmatricula = aux;
        array[i].folio = Math.ceil(aux / 2);
        docs.push(array[i]);
      }
    }
    if (docs) {
      const options = { ordered: false };
      await Matriculas.insertMany(docs, options);
    }
    return res.status(200).json({
      duplicados,
    });
  } catch (error) {
    return res.status(500).json({ message: "Problem" });
  }
};

export const getMatriculas = async (req, res) => {
  try {
    const matriculas = await Matriculas.find()
      .lean()
      .select({ curso: 1, typo: 1 })
      .populate("fkestudiante", "fullname cedula email fkparroquia sexo")
      .populate("fknivel", "nombre");

    return res.json(matriculas);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getReportes = async (req, res) => {
  try {
    const curs = req.query.c;
    const matriculas = await Matriculas.find({
      fknivel: {
        $in: [curs],
      },
    })
      .lean()
      .select({ curso: 1, nombre: 1, fecha: 1 });
    return res.json(matriculas);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getInfoMat = async (req, res) => {
  try {
    const periodo = req.query.p;
    const mat = await Matriculas.findOne({
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getListaMatricula = async (req, res) => {
  try {
    const curso = req.query.curso;
    const mat = await Matriculas.find({
      fknivel: {
        $in: [curso],
      },
    })
      .lean()
      .select({ curso: 1, nombre: 1, fecha: 1, });
    const coleccion = {
      matriculados: mat,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json();
  }
};

export const getMatriculaFolio = async (req, res) => {
  try {
    const mat = await Matriculas.findOne().sort({ createdAt: -1 });
    const coleccion = {
      num: 1,
      infor: mat,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json();
  }
};

export const getMatriculasById = async (req, res) => {
  try {
    const { matriculaId } = req.params;
    const niveles = await Matriculas.findById(matriculaId)
      .populate("fknivel", { nombre: 1, area: 1 })
      .populate("academico", "nombre");
    res.status(200).json(niveles);
  } catch (error) {
    return res.status(500).json();
  }
};

export const getMatriculaByIdReport = async (req, res) => {
  try {
    let result = [];
    let cadenaId = req.params ? req.params.matriculaId : '1';
    const array = cadenaId.split(",");
    if (array != '') {
      for (let i = 0; i < array.length; i++) {
        const niveles = await Matriculas.findById(array[i]).populate("fknivel", "nombre").populate("academico", "nombre");
        result.push(niveles);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json();
  }

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

export const getQueryAll = async (req, res) => {
  try {
    const matriculas = await Matriculas.find({})
      .lean()
      .select({ curso: 1, nombre: 1, fecha: 1, typo: 1, fknivel: 1 });
    const coleccion = {
      data: matriculas,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json();
  }
};
