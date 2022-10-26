import Academicos from "../../models/Matricula/Academicos";

export const createPeriodo = async (req, res) => {
  const { nombre, estado } = req.body;
  try {
    const newPeriodo = new Academicos({
      nombre,
      estado,
    });
    const PeriodoSaved = await newPeriodo.save();
    res.status(201).json(PeriodoSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getPeriodo = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Academicos.countDocuments();
    const paginas = Math.ceil(total / limit);
    const perodos = await Academicos.find({}).skip((limit * skip) - limit).limit(limit);
    const coleccion = {
      niveles: perodos,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
}


export const getAllPeriodo = async (req, res) => {
  try {
    const perodos = await Academicos.find().lean();
    const coleccion = {
      niveles: perodos,
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getPeriodoById = async (req, res) => {
  try {
    const { periodoId } = req.params;
    const niveles = await Academicos.findById(periodoId);
    res.status(200).json(niveles);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const updatePeriodoById = async (req, res) => {
  try {
    const updatedMateria = await Academicos.findByIdAndUpdate(
      req.params.periodoId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedMateria);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const deletePeriodoById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Academicos.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}

export const activate = async (req, res) => {
  try {
    await Academicos.updateMany({}, { $set: { estado: 0 } })
    const reg = await Academicos.findByIdAndUpdate(
      { _id: req.params.id },
      { estado: 1 }
    );
    res.status(200).json(reg);
  } catch (e) {
    return res.status(500).json();
  }
}