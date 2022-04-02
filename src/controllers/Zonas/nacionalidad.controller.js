import Nacionalidad from "../../models/Zonas/Nacionalidad";

export const createNacionalidad = async (req,res)=>{
    const { nombre } = req.body;
    try {
        const newNacionalidad = new Nacionalidad({
          nombre,
        });
    
        const NacionalidadSaved = await newNacionalidad.save();
    
        res.status(201).json(NacionalidadSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}


export const getNacionalidad = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Nacionalidad.countDocuments();
  const paginas = Math.ceil(total/limit);
  const nacionalidad = await Nacionalidad.find({}).skip((limit * skip)-limit).limit(limit).sort({updatedAt:-1});
  const coleccion = {
    datas: nacionalidad,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}


export const getNacionalidadById = async (req,res)=>{
    const { nacionalidadId } = req.params;

  const provincias = await Nacionalidad.findById(nacionalidadId);
  res.status(200).json(provincias);
    
}

export const updateNacionalidadById = async (req,res)=>{
    const updatedNacionalidad = await Nacionalidad.findByIdAndUpdate(
        req.params.nacionalidadId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedNacionalidad);
}

export const deleteNacionalidadById = async (req,res)=>{
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Nacionalidad.deleteMany({
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


export const getChildNacionalidad = async (req, res) => {
  const documentos = await Nacionalidad.find({})
    .lean()
    const coleccion = {
      datas: documentos,
  };
  return res.json(coleccion);
};

export const activate = async (req, res, next) => {
  try {
    const reg = await Nacionalidad.findByIdAndUpdate(
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