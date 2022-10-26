import Aulavirtual from "../../models/aulavirtual/Aulavirtual";

//----------------------------------------------------[CREAR UNA EXAMEN [DOCENTES, ]
export const createQuizz = async (req, res) => {
    try {
      await Aulavirtual.findByIdAndUpdate(
        req.params.aulaId,
        { $push: { examen: req.body.examen } },
        {
          new: true,
        }
      );
      res.status(200).json(req.params.aulaId);
    } catch (e) {
      res.status(500).json("error del servidor");
    }
  };

  //------------------------------------- ELIMINAR QUIZZ [DOCENTE, ]
export const deleteQuizzById = async (req, res) => {
  try {
    let cadenaId = req.body;
    await Aulavirtual.updateOne(
      { _id: req.params.quizzId },
      { $pull: { examen: { _id: cadenaId } } },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};
//------------------------------------- guardamos los examenes [DOCENTE, ]
export const saveQuestionById = async (req, res) => {
  try {
  let array = req.body;
   for (let i = 0; i < array.length; i++) {
    await Aulavirtual.updateOne(
      { "examen._id": req.params.quizzId },
      { $push: { "examen.$.surveys": array[i] } },
      {
        new: true,
      }
    );
   }
   res.status(200).json("crearnote");
  } catch (error) {
    res.status(500).json({ message: "No mat found" });
  }
   
};

//----------------------------------------------------EDITAR TAREA [DOCENTES, ]
export const editExamById = async (req, res) => {
  try {
    let cadenaId = req.params.aulaId;
    const array = cadenaId.split(",");
    if (array[0] != null && array[1] != null) {
      await Aulavirtual.updateOne(
        { _id: array[0]},
        { $set: { 
                  "examen.$[perf].nombre": req.body.examen.nombre,
                  "examen.$[perf].startDate": req.body.examen.startDate,
                  "examen.$[perf].endDate": req.body.examen.endDate,
                  "examen.$[perf].descripcion": req.body.examen.descripcion,//
                  "examen.$[perf].time": req.body.examen.time,
                  "examen.$[perf].security": req.body.examen.security,
                } },
        {
          arrayFilters: [{
            "perf._id": {$eq : array[1]}}],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } else {
      res.status(200).json("req.params.aulaId");
    }
  } catch (e) {
    res.status(500).json("error del servidor");
  }
};

export const solveQuiz = async (req, res) => {
  try {
    await Aulavirtual.updateOne(
      { "examen._id": req.params.quizzId },
      { $push: { 
                 "examen.$.answers": req.body,
                } 
      },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};