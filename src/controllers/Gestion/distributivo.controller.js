import Distributivo from "../../models/Gestion/Distributivo";

export const createDistributivo = async (req,res)=>{
    const { fnivel,fdocente, fmateria,paralelo } = req.body;
    try {
        const newMateria = new Distributivo({
          fnivel,
          fdocente, 
          fmateria,
          paralelo,
          planificacion:''
        });
    
        const DistributivoSaved = await newMateria.save();
    
        res.status(201).json(DistributivoSaved);
      } catch (error) {
       
        return res.status(500).json(error);
      }
}

//--------------------------------CREAR ESTUDIANTE--------------------
export const createArrayDistributivo = async (req, res) => {
   try {
     const array = req.body;
     if (array.length !=0) {
       const options = { ordered: false };
       await Distributivo.insertMany(array, options);
     }
       return res.status(200).json({ 'docs': 'docs'});
   } catch (error) {
     console.log(error)
      return res.status(500).json({ message:'Problem'});  
   }
};

export const getDistributivo = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);


  const total = await Distributivo.countDocuments();
  const paginas = Math.ceil(total/limit);
  const materias = await Distributivo.find().skip((limit * skip)-limit).limit(limit)
  .populate('fdocente','fullname')
  .populate('fmateria','nombre')
  .populate('fnivel','nombre');
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
  const distributivo = await Distributivo.find({fdocente:{$in:[idDocente]}}).select({nombre: 1, paralelo: 1, planificacion:1})
  .populate('fmateria','nombre')
  .populate('fnivel','nombre');
  return res.json(distributivo);
};


export const getDistributivoById = async (req,res)=>{
    const { distributivoId } = req.params;
  const niveles = await Distributivo.findById(distributivoId)
  .populate('fmateria','nombre')
  .populate('fnivel','nombre');
  res.status(200).json(niveles);
    
}

export const getPlanificacionById = async (req,res)=>{
const { distributivoId } = req.params;
const niveles = await Distributivo.findById(distributivoId);
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

export const updatePlanificacionById = async (req,res)=>{
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