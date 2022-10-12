import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new Schema(
  {
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
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:1
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
    fkparroquia: String,
    modalidad: String,
    titulo: String,

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