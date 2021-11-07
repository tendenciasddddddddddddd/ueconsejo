import Etnias from "../../models/Zonas/Etnias";

export const createEtnias = async (req,res)=>{
    const { nombre,estado } = req.body;
    try {
        const newEtnias = new Etnias({
          nombre,
          estado,
        });
    
        const EtniasSaved = await newEtnias.save();
    
        res.status(201).json(EtniasSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}


export const getEtnias = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Etnias.countDocuments();
  const paginas = Math.ceil(total/limit);
  const etnias = await Etnias.find({}).skip((limit * skip)-limit).limit(limit).sort({updatedAt:-1});
  const coleccion = {
    datas: etnias,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}


export const getEtniasById = async (req,res)=>{
    const { etniasId } = req.params;

  const etnias = await Etnias.findById(etniasId);
  res.status(200).json(etnias);
    
}

export const updateEtniasById = async (req,res)=>{
    const updatedEtnias = await Etnias.findByIdAndUpdate(
        req.params.etniasId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedEtnias);
}

export const deleteEtniasById = async (req,res)=>{
    const { etniasId } = req.params;

    await Etnias.findByIdAndDelete(etniasId);
  
    // code 200 is ok too
    res.status(200).json();
}

//-------------------COMPONENTES CHILDS ------

export const getChildEtnia = async (req, res) => {
  const documentos = await Etnias.find({})
    .lean()
    const coleccion = {
      datas: documentos,
  };
  return res.json(coleccion);
};