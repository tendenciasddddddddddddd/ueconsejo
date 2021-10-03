import Nivel from "../../models/Gestion/Nivel";


export const createNivel = async (req,res)=>{
    const { nombres, estado, modalidad } = req.body;
    try {
        const newNiveles = new Nivel({
          nombres,
          modalidad,
          estado,
        });
    
        const NivelesSaved = await newNiveles.save();
    
        res.status(201).json(NivelesSaved);
      } catch (error) {
        //console.log(error);
        return res.status(500).json(error);
      }
}


export const getNivel = async (req,res)=>{ //CONSULTA OPTIMIZADA
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Nivel.countDocuments();
  const paginas = Math.ceil(total/limit);
  const niveles = await Nivel.find().skip((limit * skip)-limit).limit(limit).lean();
  const coleccion = {
    niveles: niveles,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}

export const getListasNiveles = async (req,res)=>{ //CONSULTA OPTIMIZADA 
    const products = await Nivel.find().lean().select({modalidad: 1,nombres:1})
    return res.json(products);
}

export const getNivelById = async (req,res)=>{
    const { id } = req.params;

  const niveles = await Nivel.findById(id);
  res.status(200).json(niveles);
    
}

export const updateNivelById = async (req,res)=>{
    const updatedNivel = await Nivel.findByIdAndUpdate(
        req.params.nivelId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedNivel);
}

export const deleteNivelById = async (req,res)=>{
    const { nivelId } = req.params;

    await Nivel.findByIdAndDelete(nivelId);
  
    // code 200 is ok too
    res.status(200).json();
}