import User from "../../models/User";
import Role from "../../models/Role";
var mongoose = require('mongoose');


//--------------------------------PAGINACION DE TABLA DEFAULT 7 EN 7--------------------
export const getEstudiantes = async (req,res)=>{
    //if(req.query.take==null || req.query.take==null)return;
    const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments({typo:{$in:["ESTS"]}});
    const paginas = Math.ceil(total/limit);
    const usuarios = await User.find({typo:{$in:["ESTS"]}}).skip((limit * skip)-limit).limit(limit).sort({updatedAt:-1});

    const coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  }

//--------------------------------LISTA PARA FILTROS [MATRICULAS, ]  --------------------
export const getListasEstudiantes = async (req,res)=>{
  const modalidad = req.query.mod;
    const products = await User.find({
      typo: {
        $in:["ESTS"]
      },
      modalidad : {
        $in:[modalidad]
      }
    }).lean().select({fullname: 1, foto: 1});
    return res.json(products);
}
//--------------------------------OPTENEMOS UN USUARIO POR ID--------------------
export const getEstudianteById = async (req,res)=>{
    const  UsuariosId  = mongoose.Types.ObjectId(req.params.id);
    const usuarios = await User.findById(UsuariosId);
    res.status(200).json(usuarios); 
  }

  //--------------------------------EDITAR USUARIO POR EL ID--------------------
export const updateEstudianteById = async (req,res)=>{
    try {
      const updatedUsuarios = await User.findByIdAndUpdate(
          req.params.usuariosId,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(updatedUsuarios);
    }catch(err){
      return res.status(500).json(err);
    }
  }
  
  //--------------------------------ELIMINAR USUARIOS POR EL ID--------------------
  export const deleteEstudianteById = async (req,res)=>{
    
    const  UsuariosId  = mongoose.Types.ObjectId(req.params.id);
    await User.findByIdAndDelete(UsuariosId);
  
    res.status(200).json();
  }

//--------------------------------CREAR ESTUDIANTE--------------------
  export const createEstudiante = async (req, res) => {

    try {
        // Getting the Request Body
       
        const {
            username, email,password,roles,nombres,apellidos,status,telefono,cedula,foto,typo, modalidad, fullname,
            sexo,fketnia,fknacionalidad,fkparroquia
        } = req.body;
        // Creating a new User Object
        const newUser = new User({
            username,email,nombres,apellidos,status,telefono,foto,cedula,typo,modalidad, fullname,
            password: await User.encryptPassword(password),
            sexo,fketnia,fknacionalidad,fkparroquia

        });

        // checking for roles
        const role = await Role.findOne({
            name: "Estudiante"
        });
        newUser.roles = [role._id];
        const savedUser = await newUser.save();

        return res.status(200).json({
            savedUser
        });
    } catch (error) {
        console.error(error);
        
    }
};