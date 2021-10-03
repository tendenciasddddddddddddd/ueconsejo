import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //********************************NUEVOS CAMPOS PARA USUARIOS ADMINISTRADORES
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    cedula: {
      type: String,
      unique: true,
    },
    foto: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    fullname: String,
    //---------------TIPO DE DOCUMENTOS
    typo:{
      type: String,
    },
    //------------------------DATOS ESTUDIANTE--------------

    sexo : String,
    fketnia : String,
    fknacionalidad : String,
    /* telefonofijo: String, */
    fkparroquia: String,
    modalidad: String,
 /*    calles: String,
    referencia: String,
    modalidad: String,
    codigo: String,
    numeric: String,
    nombrec: String,
    edad: String, */
     //---------------TIPO docentes
    titulo: String,

   
    
    //---------------TIPO MAS DATOS
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("User", productSchema);