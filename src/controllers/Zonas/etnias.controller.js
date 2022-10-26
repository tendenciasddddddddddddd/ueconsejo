import Etnias from "../../models/Zonas/Etnias";

export const createEtnias = async (req, res) => {
  const { nombre } = req.body;
  try {
    const newEtnias = new Etnias({
      nombre,
    });
    const EtniasSaved = await newEtnias.save();
    res.status(201).json(EtniasSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getEtnias = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Etnias.countDocuments();
    const paginas = Math.ceil(total / limit);
    const etnias = await Etnias.find({}).skip((limit * skip) - limit).limit(limit).sort({ updatedAt: -1 });
    const coleccion = {
      datas: etnias,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const getEtniasById = async (req, res) => {
  try {
    const { etniasId } = req.params;
    const etnias = await Etnias.findById(etniasId);
    res.status(200).json(etnias);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const updateEtniasById = async (req, res) => {
  try {
    const updatedEtnias = await Etnias.findByIdAndUpdate(
      req.params.etniasId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedEtnias);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const deleteEtniasById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Etnias.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}

export const getChildEtnia = async (req, res) => {
  try {
    const documentos = await Etnias.find({})
      .lean()
    const coleccion = {
      datas: documentos,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const activate = async (req, res, next) => {
  try {
    const reg = await Etnias.findByIdAndUpdate(
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