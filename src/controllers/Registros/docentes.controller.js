import User from "../../models/User";
import Role from "../../models/Role";

export const getDocentes = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments({ typo: { $in: ["DOCS"] } });
    const paginas = Math.ceil(total / limit);
    const usuarios = await User.find({ typo: { $in: ["DOCS"] } }).skip((limit * skip) - limit).limit(limit);
    const coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(err);
  }
}

//----------------------------------OPTENER TODOS LOS ADMINISTRADORES
export const getBuscadorUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ typo: { $in: ["DOCS"] } })
      .lean()
      .select({ fullname: 1, foto: 1, email: 1, status: 1 });
    const coleccion = {
      usuarios: usuarios,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(err);
  }
};

//--------------------------------LISTA PARA FILTROS [DISTRIBUTIVO, ]  --------------------
export const getListasDocentes = async (req, res) => {
  try {
    const products = await User.find({
      typo: {
        $in: ["DOCS"]
      },
    }).lean().select({ fullname: 1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json(err);
  }
}

//--------------------------------OPTENEMOS UN USUARIO POR ID--------------------
export const getDocenteById = async (req, res) => {
  try {
    const {id} = req.params;
    const usuarios = await User.findById(id);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(err);
  }
}
//--------------------------------EDITAR USUARIO POR EL ID--------------------
export const updateDocenteById = async (req, res) => {
  try {
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
}

//--------------------------------ELIMINAR USUARIOS POR EL ID--------------------
export const deleteDocenteById = async (req, res) => {
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
}

//--------------------------------CREAR ESTUDIANTE--------------------
export const createDocentes = async (req, res) => {
  try {
    const {
      username, email, password, roles, nombres, apellidos, status, telefono, cedula, foto, typo, modalidad, fullname,
      sexo, fketnia, fknacionalidad, fkparroquia, titulo
    } = req.body;
    // Creating a new User Object
    const newUser = new User({
      username, email, nombres, apellidos, status, telefono, foto, cedula, typo, fullname,
      password: await User.encryptPassword(password),
      sexo, fketnia, fknacionalidad, fkparroquia, titulo
    });

    // checking for roles
    const role = await Role.findOne({
      name: "Docente"
    });
    newUser.roles = [role._id];
    const savedUser = await newUser.save();

    return res.status(200).json({
      savedUser
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await User.find({ fullname: { '$regex': querys, "$options": "i" }, typo: { $in: ["DOCS"] } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};
