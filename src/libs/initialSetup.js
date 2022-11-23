import Role from "../models/Role";
import User from "../models/User";
import Configure from "../models/Configure";
import Apps from "../models/Apps";
import AperturaNotas from "../models/AperturaNotas";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "Estudiante" }).save(),//user
      new Role({ name: "Docente" }).save(),//moderator
      new Role({ name: "Admin" }).save(),//admin
      new Role({ name: "Vicerrector" }).save(),//admin
      new Role({ name: "Inspector" }).save(),//admin
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  const user = await User.findOne({ email: "10004095632w@gmailcom" });
  const roles = await Role.find({ name: { $in: ["Admin"] } });
  if (!user) {
    await User.create({
      email: "10004095632w@gmail.com",
      password: await bcrypt.hash("Medid100.", 10),
      roles: roles.map((role) => role._id),//****APARTIR DE A1QUI LOS NUEVOS DATOS
      nombres: "Esteban Wladimir",
      apellidos: "Martinez Martinez",
      fullname : "Martinez Martinez Esteban Wladimir",
      cedula: "1004095632",
      foto: "https://res.cloudinary.com/ds7xbwpoo/image/upload/v1668542101/avatar_lmylxp.webp",
      status: "Activo",
      telefono: "0995283857",
    });
    console.log('Admin User Created!')
  }
};

export const config = async () => {
  await  Configure.deleteMany();
  await Configure.create({
    logo:'https://res.cloudinary.com/ds7xbwpoo/image/upload/v1668542101/avatar_lmylxp.webp',
    unidadeducativa:'xxxx xxxx xxxx xxxx',
    ubicacion: 'xxxx xxxx xxxx xxxx',
    telefono: 'xxxx xxxx xxxx xxxx',
    direccion: 'xxxx xxxx xxxx xxxx',
    rector: 'xxxx xxxx xxxx xxxx',
    vicerector: 'xxxx xxxx xxxx xxxx',
    secretario: 'xxxx xxxx xxxx xxxx',
    inspector: 'xxxx xxxx xxxx xxxx',
  });
console.log('config create');
};

export const aplicaciones = async () => {
  await  Apps.deleteMany();
  await Apps.create({
    web:'xxxx xxxx xxxx xxxx',
    movil:'xxxx xxxx xxxx xxxx',
  });
console.log('config create');
};
export const apertura = async () => {
  await  AperturaNotas.deleteMany();
  await AperturaNotas.create({
    inicio:'2022-11-24T05:00:00.000Z',
    fin:'2022-11-30T10:00:00.000Z',
  });
console.log('Apertura create');
};