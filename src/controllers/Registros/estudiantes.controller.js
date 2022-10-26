import User from "../../models/User";
import Role from "../../models/Role";

export const getEstudiantes = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments({ typo: { $in: ["ESTS"] } });
    const paginas = Math.ceil(total / limit);
    const usuarios = await User.find({ typo: { $in: ["ESTS"] } }).skip((limit * skip) - limit).limit(limit).sort({ updatedAt: -1 });
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

export const getBuscadorUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ typo: { $in: ["ESTS"] } })
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


//--------------------------------LISTA PARA FILTROS [MATRICULAS, ]  --------------------
export const getListasEstudiantes = async (req, res) => {
  try {
    const products = await User.find({
      typo: {
        $in: ["ESTS"]
      },
    }).lean().select({ fullname: 1, foto: 1, cedula: 1, status: 1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json(err);
  }
}
//--------------------------------OPTENEMOS UN USUARIO POR ID--------------------
export const getEstudianteById = async (req, res) => {
  try {
    const { id } = req.params
    const usuarios = await User.findById(id);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(err);
  }
}

//--------------------------------EDITAR USUARIO POR EL ID--------------------
export const updateEstudianteById = async (req, res) => {
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
export const deleteEstudianteById = async (req, res) => {
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
export const createEstudiante = async (req, res) => {

  try {
    const {
      username, email, password, roles, nombres, apellidos, status, telefono, cedula, foto, typo, fullname,
      sexo, fketnia, fknacionalidad, fkparroquia
    } = req.body;
    const newUser = new User({
      username, email, nombres, apellidos, status, telefono, foto, cedula, typo, fullname,
      password: await User.encryptPassword(password),
      sexo, fketnia, fknacionalidad, fkparroquia

    });
    const role = await Role.findOne({
      name: "Estudiante"
    });
    newUser.roles = [role._id];
    const savedUser = await newUser.save();
    return res.status(200).json({
      savedUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Problem' });
  }
};
//--------------------------------CREAR ESTUDIANTE--------------------
export const createEstudianteMany = async (req, res) => {
  let roles = req.query.role;
  try {
    let array = req.body;
    const docs = [];
    const duplicados = []
    const role = await Role.findOne({ name: roles });
    for (let i = 0; i < array.length; i++) {
      const ifcedula = await User.findOne({ cedula: array[i].cedula });
      if (ifcedula) {
        duplicados.push(array[i])
      } else {
        array[i].password = await User.encryptPassword(array[i].password)
        array[i].roles = [role._id];
        docs.push(array[i])
      }
    }
    if (docs) {
      const options = { ordered: false };
      await User.insertMany(docs, options);
    }
    return res.status(200).json({
      duplicados
    });
  } catch (error) {
    return res.status(500).json({ message: 'Problem' });
  }
};

export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await User.find({ fullname: { '$regex': querys, "$options": "i" }, typo: { $in: ["ESTS"] } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};