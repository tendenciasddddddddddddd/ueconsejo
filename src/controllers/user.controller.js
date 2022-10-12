import User from "../models/User";
import Role from "../models/Role";
var mongoose = require("mongoose");

//--------------------------------PAGINACION DE TABLA DEFAULT 7 EN 7--------------------
export const getUsuarios = async (req, res) => {
  const limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número
  const skip = parseInt(req.query.page);
  const total = await User.countDocuments({ typo: { $in: ["ADMS"] } });
  const paginas = Math.ceil(total / limit);
  const usuarios = await User.find({ typo: { $in: ["ADMS"] } })
    .skip(limit * skip - limit)
    .limit(limit);
  const coleccion = {
    usuarios: usuarios,
    pagina: skip,
    paginas: paginas,
    total: total,
  };
  return res.json(coleccion);
};

//----------------------------------OPTENER TODOS LOS ADMINISTRADORES

export const getBuscadorUsuarios = async (req, res) => {
  const usuarios = await User.find({ typo: { $in: ["ADMS"] } })
    .lean()
    .select({ fullname: 1, cedula: 1, email: 1, status: 1 });
  const coleccion = {
    usuarios: usuarios,
  };
  return res.json(coleccion);
};

//--------------------------------OPTENEMOS UN USUARIO POR ID--------------------
export const getUsuariosById = async (req, res) => {
  const UsuariosId = mongoose.Types.ObjectId(req.params.id);
  const usuarios = await User.findById(UsuariosId);
  res.status(200).json(usuarios);
};

//--------------------------------EDITAR USUARIO POR EL ID--------------------
export const updateUsuariosById = async (req, res) => {
  try {
    req.body.roles = req.body.role;
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.usuariosId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUsuarios);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//--------------------------------ELIMINAR USUARIOS POR EL ID--------------------
export const deleteUsuariosById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await User.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
};

//--------------------------------RETORNAR LA LISTA DE ROLES--------------------
export const getRoles = async (req, res) => {
  const roless = await Role.find({
    name: { $in: ["Admin", "Vicerrector", "Inspector"] },
  });
  return res.json(roless);
};

//--------------------------------CREAR UN NUEVO USUARIOS --------------------
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password); //llama funcion encriptar en models/user

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {};



export const activate = async (req, res, next) => {
  try {
    const reg = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.query.state }
    );
    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await User.find({fullname: { '$regex' : querys, "$options": "i" }, typo: { $in: ["ADMS"] } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  } 
};
