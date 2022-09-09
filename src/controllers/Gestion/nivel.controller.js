import Nivel from "../../models/Gestion/Nivel";

export default {
  createNivel: async (req, res) => {
    const { nombre } = req.body;
    try {
      const newNiveles = new Nivel({
        nombre,
        
      });

      const NivelesSaved = await newNiveles.save();

      res.status(201).json(NivelesSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getNivel: async (req, res) => {
    const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
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
  },

  getListasNiveles: async (req, res) => {
    const products = await Nivel.find()
      .lean()
      .select({ nombre: 1 });
    return res.json(products);
  },
  getNivelById: async (req, res) => {
    const { id } = req.params;
  
    const niveles = await Nivel.findById(id);
    res.status(200).json(niveles);
  },
  updateNivelById: async (req, res) => {
    const updatedNivel = await Nivel.findByIdAndUpdate(
      req.params.nivelId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedNivel);
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








