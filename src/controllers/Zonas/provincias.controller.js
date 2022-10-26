import Provincias from "../../models/Zonas/Provincias";

export const createProvincias = async (req, res) => {
  const { nombre } = req.body;
  try {
    const newProvincias = new Provincias({
      nombre,
    });
    const ProvinciasSaved = await newProvincias.save();
    res.status(201).json(ProvinciasSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getProvincias = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Provincias.countDocuments();
    const paginas = Math.ceil(total / limit);
    const usuarios = await Provincias.find({}).skip((limit * skip) - limit).limit(limit).sort({ updatedAt: -1 });
    const coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
}


export const getProvinciasById = async (req, res) => {
  try {
    const { provinciasId } = req.params;
    const provincias = await Provincias.findById(provinciasId);
    res.status(200).json(provincias);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const updateProvinciasById = async (req, res) => {
  try {
    const updatedProvincias = await Provincias.findByIdAndUpdate(
      req.params.provinciasId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProvincias);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const deleteProvinciasById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Provincias.deleteMany({
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
    const reg = await Provincias.findByIdAndUpdate(
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
    const result = await Provincias.find({ nombre: { '$regex': querys, "$options": "i" } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};