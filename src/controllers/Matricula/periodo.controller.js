import Academicos from "../../models/Matricula/Academicos";

export const createPeriodo = async (req,res)=>{
    const { nombre,estado,inicia, finaliza, typo} = req.body;
    try {
        const newPeriodo = new Academicos({
          nombre,
          inicia,
          finaliza,
          estado,
          typo
        });
    
        const PeriodoSaved = await newPeriodo.save();
    
        res.status(201).json(PeriodoSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}


export const getPeriodo = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Academicos.countDocuments();
  const paginas = Math.ceil(total/limit);
  const perodos = await Academicos.find({}).skip((limit * skip)-limit).limit(limit);
  const coleccion = {
    niveles: perodos,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}

//-------------------------------------------------------------OPTENEMOS TODOS LOS PERIODOS => periodos matriculas LISTA MAT
export const getAllPeriodo = async (req,res)=>{
  const perodos = await Academicos.find().lean();
  const coleccion = {
    niveles: perodos,
  }
  return res.json(coleccion);
}


export const getPeriodoById = async (req,res)=>{
    const { periodoId } = req.params;

  const niveles = await Academicos.findById(periodoId);
  res.status(200).json(niveles);
    
}

export const updatePeriodoById = async (req,res)=>{
    const updatedMateria = await Academicos.findByIdAndUpdate(
        req.params.periodoId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedMateria);
}

export const deletePeriodoById = async (req,res)=>{
    const { periodoId } = req.params;

    await Academicos.findByIdAndDelete(periodoId);
  
    // code 200 is ok too
    res.status(200).json();
}