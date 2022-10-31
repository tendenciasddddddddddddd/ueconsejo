import Tutor from "../../models/Gestion/Tutor";

//-------------------------------------------------INSERTA TODO EL DISTRIBUTIVO TUTORES--------------------------------------------
export const createArrayTutor = async (req, res) => {
  try {
    const array = req.body;
    if (array.length != 0) {
      await Tutor.deleteMany();
      const options = { ordered: false };
      await Tutor.insertMany(array, options);
    }
    return res.status(200).json({ 'docs': 'docs' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Problem' });
  }
};


//-------------------------------------------------ENLISTA TODO EL DISTRIBUTIVO PARA EDITARLO AG-GRID--------------------------------------------
export const getAllTutor = async (req, res) => {
  try {
    const result = await Tutor.find()
      .populate('fdocente', 'fullname')
      .populate('fnivel', 'nombre');
    return res.json(result);
  } catch (error) {
    return res.status(500).json();
  }
}

//-------------------------------------------------ENLISTA DISTRIBUTIVO PARA DOCENTES TUTORES--------------------------------------------
export const getInfoTutor = async (req, res) => {
  try {
    const idDocente = req.query.id;
    const tutoes = await Tutor.find({ fdocente: { $in: [idDocente] } }).select({ paralelo: 1 })
      .populate('fnivel', 'nombre');
    return res.json(tutoes);
  } catch (error) {
    return res.status(500).json();
  }
};