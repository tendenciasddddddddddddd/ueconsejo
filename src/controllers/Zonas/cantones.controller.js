import Cantones from "../../models/Zonas/Cantones";
import Provincias from "../../models/Zonas/Provincias";

export const createCantones = async (req, res) => {
  const {
    nombre,
    fkProvincia,
    prov
  } = req.body;
  try {
    const newCantones = new Cantones({
      nombre,
      fkProvincia,
      prov
    });

    const CantonesSaved = await newCantones.save();

    res.status(201).json(CantonesSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
}
export const getCantones = async (req, res) => {
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Cantones.countDocuments();
  const paginas = Math.ceil(total / limit);
  const usuarios = await Cantones.find({}).skip((limit * skip) - limit).limit(limit).sort({
    updatedAt: -1
  });
  const coleccion = {
    datas: usuarios,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}

export const getCantonesById = async (req, res) => {
  const {
    cantonesId
  } = req.params;

  const cantones = await Cantones.findById(cantonesId);
  res.status(200).json(cantones);
}

export const updateCantonesById = async (req,res)=>{
  const updatedCantones = await Cantones.findByIdAndUpdate(
      req.params.cantonesId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedCantones);
}

export const deleteCantonesById = async (req,res)=>{
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Cantones.deleteMany({
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

export const getlistaProvincias = async (req, res) => {
  const provincia = await Provincias.find({
    estado: {
      $in: ["1"]
    }
  }, {
    'nombre': true
  });
  return res.json(provincia);
}

export const activate = async (req, res, next) => {
  try {
    const reg = await Cantones.findByIdAndUpdate(
      { _id: req.params.id },
      { estado: req.query.state}
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
    const result = await Cantones.find({nombre: { '$regex' : querys, "$options": "i" }});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  } 
};