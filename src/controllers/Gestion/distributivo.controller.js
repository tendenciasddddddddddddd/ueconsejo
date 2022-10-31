import Distributivo from "../../models/Gestion/Distributivo";


//-------------------------------------------------INSERTA TODO EL DISTRIBUTIVO--------------------------------------------
export const createArrayDistributivo = async (req, res) => {
  try {
    const array = req.body;
    if (array.length != 0) {
      await Distributivo.deleteMany();
      const options = { ordered: false };
      await Distributivo.insertMany(array, options);
    }
    return res.status(200).json({ 'docs': 'docs' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Problem' });
  }
};

//-------------------------------------------------ENLISTA LAS PLANIIFICACIÓNES--------------------------------------------
export const getDistributivo = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Distributivo.countDocuments();
    const paginas = Math.ceil(total / limit);
    const materias = await Distributivo.find().skip((limit * skip) - limit).limit(limit)
      .populate('fdocente', 'fullname')
      .populate('fmateria', 'nombre')
      .populate('fnivel', 'nombre');
    const coleccion = {
      niveles: materias,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json();
  }
}

//-------------------------------------------------ENLISTA TODO EL DISTRIBUTIVO PARA EDITARLO AG-GRID--------------------------------------------
export const getAllDistributivo = async (req, res) => {
  try {
    const result = await Distributivo.find()
      .populate('fdocente', 'fullname')
      .populate('fmateria', 'nombre')
      .populate('fnivel', 'nombre');
    return res.json(result);
  } catch (error) {
    return res.status(500).json();
  }
}

//-------------------------------------------------ENLISTA DISTRIBUTIVO PARA DOCENTES--------------------------------------------
export const getInfoDistributivo = async (req, res) => {
  try {
    const idDocente = req.query.id;
    const distributivo = await Distributivo.find({ fdocente: { $in: [idDocente] } }).select({ nombre: 1, paralelo: 1, planificacion: 1 })
      .populate('fmateria', 'nombre area')
      .populate('fnivel', 'nombre num');
    return res.json(distributivo);
  } catch (error) {
    return res.status(500).json();
  }
};


export const getDistributivoById = async (req, res) => {
  try {
    const { distributivoId } = req.params;
    const niveles = await Distributivo.findById(distributivoId)
      .populate('fmateria', 'nombre')
      .populate('fnivel', 'nombre');
    res.status(200).json(niveles);
  } catch (error) {
    return res.status(500).json();
  }
}

export const getPlanificacionById = async (req, res) => {
  try {
    const { distributivoId } = req.params;
    const niveles = await Distributivo.findById(distributivoId);
    res.status(200).json(niveles);
  } catch (error) {
    return res.status(500).json();
  }
}


export const updatePlanificacionById = async (req, res) => {
  try {
    await Distributivo.findByIdAndUpdate(
      req.params.distributivoId,
      { $push: { 'planificacion': req.body.planificacion} },
      {
        new: true,
      }
    );
    res.status(200).json('req.params.aulaId');
  } catch (error) {
    return res.status(500).json();
  }
}

export const deletePlanificacion = async (req, res) => {
  try {
    let cadenaId = req.body;
    await Distributivo.updateOne(
      { _id: req.params.distributivoId },
      { $pull: { planificacion : { _id: cadenaId } } },
      {
        new: true,
      }
    );
    res.status(200).json("crearnote");
  } catch (e) {
    res.status(500).json({ message: "No mat found" });
  }
};