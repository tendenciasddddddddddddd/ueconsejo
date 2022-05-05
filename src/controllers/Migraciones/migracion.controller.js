import Matriculas from "../../models/Matricula/Matriculas";
import MigracionMatricula from "../../models/Matricula/MigracionMatricula";

//-------------------CLONAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------

export const createMigracionMatricula = async (req,res)=>{
  
    const version = req.query.modalidad;
    Matriculas.find({"typo": version}).then((colecciones) => {
      colecciones.forEach((array) => {
        const nuewData = MigracionMatricula(array);
        nuewData.isNew = true;  
        nuewData.save();
       
      });
    });
    return res.json('Hecho');
}

//-------------------ELIMINAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------

export const deleteMatriculasMany = async (req,res)=>{
  try {
    const version = req.query.modalidad;
    await Matriculas.deleteMany({
      typo: {
        $in: version,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}


export const getQueryAll = async (req,res)=>{
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await Provincias.countDocuments();
  const paginas = Math.ceil(total/limit);
  const usuarios = await MigracionMatricula.find({}).skip((limit * skip)-limit).limit(limit);
  const coleccion = {
    usuarios: usuarios,
    pagina: skip,
    paginas: paginas,
    total: total
  }
  return res.json(coleccion);
}