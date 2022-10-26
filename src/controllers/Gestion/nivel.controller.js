import Nivel from "../../models/Gestion/Nivel";

export default {
  createNivel: async (req, res) => {
    const { nombre, num } = req.body;
    try {
      const newNiveles = new Nivel({
        nombre, num
      });
      const NivelesSaved = await newNiveles.save();
      res.status(201).json(NivelesSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getNivel: async (req, res) => {
    try {
      const limit = parseInt(req.query.take);
      const skip = parseInt(req.query.page);
      const total = await Nivel.countDocuments();
      const paginas = Math.ceil(total / limit);
      const niveles = await Nivel.find()
        .skip(limit * skip - limit)
        .limit(limit)
        .lean();
      const coleccion = {
        niveles: niveles,
        pagina: skip,
        paginas: paginas,
        total: total,
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getListasNiveles: async (req, res) => {
    try {
      const products = await Nivel.find()
        .lean()
        .select({ nombre: 1, num: 1 });
      return res.json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getNivelById: async (req, res) => {
    try {
      const { id } = req.params;
      const niveles = await Nivel.findById(id);
      res.status(200).json(niveles);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateNivelById: async (req, res) => {
    try {
      const updatedNivel = await Nivel.findByIdAndUpdate(
        req.params.nivelId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedNivel);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteNivelById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Nivel.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await Nivel.findByIdAndUpdate(
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
};
