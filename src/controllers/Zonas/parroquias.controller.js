import Cantones from "../../models/Zonas/Cantones";
import Parroquias from "../../models/Zonas/Parroquias";

export const createParroquias = async (req, res) => {
  const {
    nombre,
    estado,
    fkCanton,
    cant
  } = req.body;
  try {
    const newParroquias = new Parroquias({
      nombre,
      estado,
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
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
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
}

export const getParroquiasById = async (req, res) => {
  const {
    parroquiasId
  } = req.params;

  const parroquias = await Parroquias.findById(parroquiasId);
  res.status(200).json(parroquias);
}

export const updateParroquiasById = async (req,res)=>{
  const updatedParroquias = await Parroquias.findByIdAndUpdate(
      req.params.parroquiasId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedParroquias);
}

export const deleteParroquiasById = async (req,res)=>{
  const { parroquiasId } = req.params;

  await Parroquias.findByIdAndDelete(parroquiasId);

  // code 200 is ok too
  res.status(200).json();
}
//-----------------------OPTENEMOS LISTA COMPLETA DE LAS PROVINCIAS 

export const getlistaCantones = async (req, res) => {
  const provincia = await Cantones.find({
    estado: {
      $in: ["1"]
    }
  }, {
    'nombre': true
  });
  return res.json(provincia);
}