import Matriculas from "../../models/Matricula/Matriculas";

//---------------------------------------------------------SIRVE LISTA DE ESTUDIANTES A CALIFICAR [DOCENTES, ]
export const getMatriculaNota = async (req, res) => {
  try {
    const idCurso = req.query.curso;
    const distributivo = await Matriculas.find({
      fknivel: { $in: [idCurso] },
    }, { 'curso': 1, 'nombre': 1, 'calificaciones': 1, iniciales: 1 }).populate('academico', 'nombre')
      .lean();
    return res.json(distributivo);
  } catch (error) {
    return res.status(500).json();
  }
};

//---------------------------------------------------------ASUGNAR ASISTENCIAS  [DOCENTES, ]
export const getMatriculaAsistencia = async (req, res) => {
  try {
    const idCurso = req.query.curso;
    const distributivo = await Matriculas.find({
      fknivel: { $in: [idCurso] },
    })
      .lean().select({ curso: 1, nombre: 1 });
    return res.json(distributivo);
  } catch (error) {
    return res.status(500).json();
  }
};

//---------------------------------------------------------REVISAR NOTAS DE CADA ESTUSIANTES [ESTUDIANTES, ]  
export const getMatriculasNotaById = async (req, res) => {
  try {
    const { matriculaId } = req.params;
    const matricula = await Matriculas.findOne({ fkestudiante: matriculaId })
      .populate('fknivel', 'nombre')
      .populate('academico', 'nombre');
    res.status(200).json(matricula);
  } catch (error) {
    res.status(500).json({ message: "No mat found" });
  }
}

//-------------------------------------------------------REFORMA DE CALIFICACIONES RESUELVE [DOCENTE, ]-------------------------------------

export const createNotaArbol1ById = async (req, res) => {
  try {
    let cadenaId = req.params.matriculaId;
    const array = cadenaId.split(",");
    await Matriculas.updateMany(
      { _id: { $in: array } },
      { $push: { 'calificaciones': req.body.calificaciones } },
      {
        new: true,
      }
    );
    res.status(200).json('crearnote');
  } catch (error) {
    return res.status(500).json();
  }
}

//-------------------------------------------------------REFORMA DE INICIALES [DOCENTE, ]-------------------------------------

export const createNotaInicialesId = async (req, res) => {
  try {
    let cadenaId = req.params.matriculaId;
    const array = cadenaId.split(",");
    await Matriculas.updateMany(
      { _id: { $in: array } },
      { $push: { 'iniciales': req.body.iniciales } },
      {
        new: true,
      }
    );
    res.status(200).json('crearnote');
  } catch (error) {
    return res.status(500).json();
  }
}



//------------------------------------- INSERTA LAS NOTAS-------------------------------------

export const createNotaArbol2ById = async (req, res) => {
  try {
    await Matriculas.updateOne(
      { _id: req.params.matriculaId, 'calificaciones._id': req.body.calificaciones._id },
      { $push: { 'calificaciones.$.notas': req.body.calificaciones.notas } },
      {
        new: true,
      }
    );
    res.status(200).json('crearnote');
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
}



//----------------CGRABAR NOTAS DE FORMA MASIVA [DOCENTES, ]

export const createFullNote = async (req, res) => {
  try {
    let array = req.body;
    for (let i = 0; i < array.length; i++) {
      await Matriculas.updateOne(
        { _id: array[i].id, 'calificaciones._id': array[i].fora },
        {
          $set: {
            'calificaciones.$.notas': array[i].notas,
            'calificaciones.$.promediof': array[i].promediof
          }
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json('crearnote');
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
}

//----------------CGRABAR NOTAS DE FORMA MASIVA [DOCENTES, ] PARA SUPLETORIOS

export const createFullSupletorios = async (req, res) => {
  try {
    let array = req.body;
    for (let i = 0; i < array.length; i++) {
      await Matriculas.updateOne(
        { _id: array[i].id, 'calificaciones._id': array[i].fora },
        {
          $set: {
            'calificaciones.$.suple': array[i].suple,
            'calificaciones.$.reme': array[i].reme,
            'calificaciones.$.gracia': array[i].gracia,
            'calificaciones.$.pfinal': array[i].pfinal
          }
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json('crearnote');
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
}


export const createFullComportamiento = async (req, res) => {
  try {
    let array = req.body;
    for (let i = 0; i < array.length; i++) {
      await Matriculas.updateOne(
        { _id: array[i].id, 'calificaciones._id': array[i].fora },
        {
          $set: {
            'calificaciones.$.comportamiento': array[i].comportamiento,
          }
        },
        {
          new: true,
        }
      );
    }
    res.status(200).json('crearnote');
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
}

export const createFullProyectos = async (req, res) => {
  try {
    let array = req.body;
     for (let i = 0; i < array.length; i++) {
       await Matriculas.updateOne(
         { _id: array[i].id, 'calificaciones._id': array[i].fora },
         {
           $set: {
             'calificaciones.$.proyectos': array[i].proyectos,
           }
         },
         {
           new: true,
         }
       );
     }
    res.status(200).json('crearnote');
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "No mat found" });
  }
}

//------------------------------------- CALIFICAR DESARROLLO HUMANO INTEGRAL ------------

export const createFullDhi = async (req, res) => {
  try {
    let array = req.body;
     for (let i = 0; i < array.length; i++) {
       await Matriculas.updateOne(
         { _id: array[i].id, 'calificaciones._id': array[i].fora },
         {
           $set: {
             'calificaciones.$.dhi': array[i].dhi,
           }
         },
         {
           new: true,
         }
       );
     }
    res.status(200).json('crearnote');
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "No mat found" });
  }
}

//------------------------------------- INSERTAR NOTAS DE INICIAL 1 2 Y PRIMERO ------------
export const createFullIniciales = async (req, res) => {
  try {
    let array = req.body;
     for (let i = 0; i < array.length; i++) {
       await Matriculas.updateOne(
         { _id: array[i].id, 'iniciales._id': array[i].fora },
         {
           $set: {
             'iniciales.$.notas': array[i].iniciales,
           }
         },
         {
           new: true,
         }
       );
     }
    res.status(200).json('crearnote');
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "No mat found" });
  }
}

//------------------------------------- ELIMINAR NOTAS [DOCENTE, ]

export const deleteNoteById = async (req, res) => {
  try {
    let array = req.body;
    for (let i = 0; i < array.length; i++) {
      await Matriculas.updateOne(
        { _id: array[i].id, 'calificaciones._id': array[i].fora },
        { $set: { 'calificaciones.$.notas': [] } },
        {
          new: true,
        },
      );
    }
    res.status(200).json('crearnote');
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};

