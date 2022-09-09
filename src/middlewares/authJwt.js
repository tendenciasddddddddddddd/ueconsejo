import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "Acceso no autorizado" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    if (!verifiUser(decoded.role)) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
const verifiUser = function (param){
  if (param ==='Admin') {
    return true
  } else if (param ==='Docente'){
    return true
  } else if (param ==='Estudiante') {
    return true
  } else {
    return false;
  }
}
export const isSecretario = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Secretario") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Admin"||roles[i].name === "Secretario") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

export const isDocente = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Docente"||roles[i].name === "Admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Rol Docente!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};