import Etnias from "../../models/Zonas/Etnias";

export const createEtnias = async (req,res)=>{
    const { nombre } = req.body;
    try {
        const newEtnias = new Etnias({
          nombre,
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

//-------------------COMPONENTES CHILDS ------

export const getChildEtnia = async (req, res) => {
  const documentos = await Etnias.find({})
    .lean()
    const coleccion = {
      datas: documentos,
  };
  return res.json(coleccion);
};

export const activate = async (req, res, next) => {
  try {
    const reg = await Etnias.findByIdAndUpdate(
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