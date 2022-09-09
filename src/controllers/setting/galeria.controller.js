import Galeria from "../../models/setting/Galeria";

export const createGaleria = async (req,res)=>{
    const { name } = req.body;
    try {
        const newGaleria = new Galeria({
          name,
        });
        const GaleriaSaved = await newGaleria.save();
        res.status(201).json(GaleriaSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
}

export const getGaleria = async (req,res)=>{
  const limit = parseInt(req.query.take);
  const skip = parseInt(req.query.page);
  const total = await Galeria.countDocuments();
  const paginas = Math.ceil(total/limit);
  const usuarios = await Galeria.find({}).skip((limit * skip)-limit).limit(limit).sort({updatedAt:-1});
  const coleccion = {
    usuarios: usuarios,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}

export const deleteGaleriaById = async (req,res)=>{
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Galeria.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}

