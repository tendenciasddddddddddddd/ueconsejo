import Distributivo from "../../models/Gestion/Distributivo";

export const createDistributivo = async (req,res)=>{
    const { nombre,fnivel,fdocente,icono, fmateria,facademicos,paralelo } = req.body;
    try {
        const newMateria = new Distributivo({
          nombre,
          icono,
          fnivel,
          fdocente, 
          fmateria,
          facademicos,
          paralelo
        });
    
        const DistributivoSaved = await newMateria.save();
    
        res.status(201).json(DistributivoSaved);
      } catch (error) {
        
        return res.status(500).json(error);
      }
}


export const getDistributivo = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);

  const modal = req.query.modal;

  const total = await Distributivo.countDocuments({nombre:{$in:[modal]}});
  const paginas = Math.ceil(total/limit);
  const materias = await Distributivo.find({nombre:{$in:[modal]}}).skip((limit * skip)-limit).limit(limit).sort({updatedAt:-1})
  .populate('fdocente','fullname')
  .populate('fmateria','nombre')
  .populate('fnivel','nombres');
  const coleccion = {
    niveles: materias,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}

export const getInfoDistributivo = async (req, res) => {  //RESUELVE LA LISTA DE CURSOS PARA DOCENTE
  const idDocente = req.query.id;
  const distributivo = await Distributivo.find({fdocente:{$in:[idDocente]}}).select({nombre: 1, paralelo: 1})
  .populate('fmateria','nombre')
  .populate('fnivel','nombres');
  return res.json(distributivo);
};


export const getDistributivoById = async (req,res)=>{
    const { distributivoId } = req.params;
  const niveles = await Distributivo.findById(distributivoId)
  .populate('fmateria','nombre')
  .populate('fnivel','nombres');
  res.status(200).json(niveles);
    
}

export const updateDistributivoById = async (req,res)=>{
    const updateddistributivo = await Distributivo.findByIdAndUpdate(
        req.params.distributivoId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updateddistributivo);
}

export const deleteDistributivoById = async (req,res)=>{
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Distributivo.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}