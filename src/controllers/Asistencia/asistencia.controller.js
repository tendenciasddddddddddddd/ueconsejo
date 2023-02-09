import Matriculas from "../../models/Matricula/Matriculas";

export const createAsistenciaById = async (req, res) => {
    try {
        let array = req.body;
        for (let i = 0; i < array.length; i++) {
            const model = {
                fecha : array[i].fecha,
                estado : array[i].estado
            }
            await Matriculas.updateOne(
              { _id: array[i]._id,  },
              { $push: { 'asistencias': model } },
              {
                new: true,
              }
            );
          }
      res.status(200).json('crearnote');
    } catch (error) {
        console.log(error);
      return res.status(500).json();
    }
  }

  export const justificarFaltas = async (req, res) => {
    try {
      let array = req.body;
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        console.log('ENTRA');
        await Matriculas.updateOne(
          { _id: array[i]._id, 'asistencias._id': array[i].fora },
          {
            $set: {
              'asistencias.$.estado': 2,
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