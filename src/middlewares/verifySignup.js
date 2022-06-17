import User from "../models/User";
import { ROLES } from "../models/Role";
import Matriculas from "../models/Matricula/Matriculas";
const { ObjectID } = require('mongodb');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({cedula: req.body.cedula });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "El correo electrónico ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
    
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

const matriculaDuplicada = async (req, res, next) => {
     
       try{
        const per = await Matriculas.findOne({
          academico : req.body.academico,
          fkestudiante: req.body.fkestudiante
         });
  
         if(per){
          return res.status(400).json({ message: "El estudiante ya esta matriculado" });
         }
         next();
       }
        catch(err){
          res.status(500).json({ message: erro });
        }

}

export { checkDuplicateUsernameOrEmail, checkRolesExisted, matriculaDuplicada };