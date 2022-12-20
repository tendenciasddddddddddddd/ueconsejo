import Materia from "../../models/Gestion/Materia";

export const createMateria = async (req, res) => {
  const { nombre, estado, area } = req.body;
  try {
    const newMateria = new Materia({
      nombre,
      estado, area
    });
    const MateriaSaved = await newMateria.save();
    res.status(201).json(MateriaSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getMateria = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Materia.countDocuments();
    const paginas = Math.ceil(total / limit);
    const materias = await Materia.find({}).skip((limit * skip) - limit).limit(limit);
    const coleccion = {
      niveles: materias,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//--------------------------------LISTA PARA FILTROS--------------------
export const getListasMaterias = async (req, res) => {
  try {
    const products = await Materia.find({}, {
      'nombre': true,'estado': true,
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getMateriaById = async (req, res) => {
  try {
    const { materiaId } = req.params;
    const niveles = await Materia.findById(materiaId);
    res.status(200).json(niveles);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const updateMateriaById = async (req, res) => {
  try {
    const updatedMateria = await Materia.findByIdAndUpdate(
      req.params.materiaId,
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

export const deleteMateriaById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Materia.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}

export const activate = async (req, res, next) => {
  try {
    const reg = await Materia.findByIdAndUpdate(
      { _id: req.params.id },
      { estado: req.query.state }
    );
    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}