import Cantones from "../../models/Zonas/Cantones";
import Parroquias from "../../models/Zonas/Parroquias";

export const createParroquias = async (req, res) => {
  const {
    nombre,
    fkCanton,
    cant
  } = req.body;
  try {
    const newParroquias = new Parroquias({
      nombre,
      fkCanton,
      cant
    });
    const ParroquiasSaved = await newParroquias.save();
    res.status(201).json(ParroquiasSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
}
export const getParroquias = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Parroquias.countDocuments();
    const paginas = Math.ceil(total / limit);
    const usuarios = await Parroquias.find({}).skip((limit * skip) - limit).limit(limit).sort({
      updatedAt: -1
    });
    const coleccion = {
      datas: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json();
  }
}

export const getParroquiasById = async (req, res) => {
  try {
    const {parroquiasId} = req.params;
    const parroquias = await Parroquias.findById(parroquiasId);
    res.status(200).json(parroquias);
  } catch (error) {
    return res.status(500).json();
  }
}

export const updateParroquiasById = async (req, res) => {
  try {
    const updatedParroquias = await Parroquias.findByIdAndUpdate(
      req.params.parroquiasId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedParroquias);
  } catch (error) {
    return res.status(500).json();
  }
}

export const deleteParroquiasById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Parroquias.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}
//-----------------------OPTENEMOS LISTA COMPLETA DE LAS PROVINCIAS 

export const getlistaCantones = async (req, res) => {
  try {
    const provincia = await Cantones.find({
      estado: {
        $in: ["1"]
      }
    }, {
      'nombre': true
    });
    return res.json(provincia);
  } catch (error) {
    return res.status(500).json();
  }
}

export const activate = async (req, res, next) => {
  try {
    const reg = await Parroquias.findByIdAndUpdate(
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

export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await Parroquias.find({ nombre: { '$regex': querys, "$options": "i" } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};