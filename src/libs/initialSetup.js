import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "Estudiante" }).save(),//user
      new Role({ name: "Docente" }).save(),//moderator
      new Role({ name: "Admin" }).save(),//admin
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "10004095632w@gmailcom" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["Admin"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "10004095632w@gmail.com",
      password: await bcrypt.hash("Imperio 789.", 10),
      roles: roles.map((role) => role._id),//****APARTIR DE A1QUI LOS NUEVOS DATOS
      nombres: "Esteban Wladimir",
      apellidos: "Martinez Martinez",
      fullname : "Martinez Martinez Esteban Wladimir",
      cedula: "1004095632",
      foto: "https://res.cloudinary.com/stebann/image/upload/v1631310792/profile_b9t64l.png",
      status: "Activo",
      telefono: "0995283857",
    });
    console.log('Admin User Created!')
  }
};