import Provincias from "../../models/Zonas/Provincias";

export const createProvincias = async (req,res)=>{
    const { nombre,estado } = req.body;
    try {
        const newProvincias = new Provincias({
          nombre,
          estado,
        });
    
        const ProvinciasSaved = await newProvincias.save();
    
        res.status(201).json(ProvinciasSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}


export const getProvincias = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Provincias.countDocuments();
  const paginas = Math.ceil(total/limit);
  const usuarios = await Provincias.find({}).skip((limit * skip)-limit).limit(limit).sort({updatedAt:-1});
  const coleccion = {
    usuarios: usuarios,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}


export const getProvinciasById = async (req,res)=>{
    const { provinciasId } = req.params;

  const provincias = await Provincias.findById(provinciasId);
  res.status(200).json(provincias);
    
}

export const updateProvinciasById = async (req,res)=>{
    const updatedProvincias = await Provincias.findByIdAndUpdate(
        req.params.provinciasId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedProvincias);
}

export const deleteProvinciasById = async (req,res)=>{
    const { provinciasId } = req.params;

    await Provincias.findByIdAndDelete(provinciasId);
  
    // code 200 is ok too
    res.status(200).json();
}