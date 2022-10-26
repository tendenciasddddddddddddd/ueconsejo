import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

import ResetEmail from "../conf/ResetEmail";
export const signUp = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            roles,
            nombres,
            apellidos,
            telefono,
            cedula,
            foto,
            typo,
            fullname,
        } = req.body;
        const newUser = new User({
            username,
            email,
            nombres,
            apellidos,
            telefono,
            foto,
            cedula,
            typo,
            fullname,
            password: await User.encryptPassword(password),
        });
        if (req.body.role) {
            newUser.roles = req.body.role;
        } else {
            const role = await Role.findOne({
                name: "Docente"
            });
            newUser.roles = [role._id];
        }
        newUser.roles = req.body.role;
        const savedUser = await newUser.save();
        return res.status(200).json({
            savedUser
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};
//---------------------------------------------------------LOGIN ACCESS--------------------------
export const signin = async (req, res) => {
    try {
        var userFound = {}
        if (vefificaIfEmail(req.body.email)) {
            userFound = await User.findOne({
                email: req.body.email
            }).populate(
                "roles"
            );
        } else {
            userFound = await User.findOne({
                cedula: req.body.email
            }).populate(
                "roles"
            );
        }
        if (!userFound) return res.status(400).json({
            message: "User Not Found 1"
        });
        //SI EXISTE PASA A VERIFICAR Y DESENCRIPTAR LA CONTRASEÑA
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );
        //RETORNA EL RESULATDO
        if (!matchPassword)
            return res.status(402).json({
                token: null,
                message: "Invalid Password",
            });
        //OPTENERMOS EL ROL
        var toles = null
        const roles = await Role.find({
            _id: {
                $in: userFound.roles
            }
        });
        for (let i = 0; i < roles.length; i++) {
            toles = roles[0].name
        }
        const token = jwt.sign({
            id: userFound._id,
            role: toles,
        }, config.SECRET, {
            expiresIn: '24d', // 24 hours
        });

        if (!userFound.modalidad) {
            userFound.modalidad = 'none';
        }
        const isaccesos = {
            tokens: token,
            foto: userFound.foto,
            nombre: userFound.fullname,
            email: userFound.cedula,
            modalidad: userFound.modalidad,
        }
        res.status(200).json({
            isaccesos
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const vefificaIfEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

//---------------------------------------------------------VUE OUTH GOOGLE API--------------------------
export const googleAuthApi = async (req, res) => {
    try {
        // EL CUERPO DE CORREO O EL CUERPO DE USERNAME
        const userFound = await User.findOne({
            email: req.body.email
        }).populate(
            "roles"
        );
        //VERIFICAR sI EL USUARIO EXISTE EN BASE DE DATOS
        if (!userFound) return res.status(400).json({
            message: "User Not Found 1"
        });

        //OPTENERMOS EL ROL
        var toles = null
        const roles = await Role.find({
            _id: {
                $in: userFound.roles
            }
        });
        for (let i = 0; i < roles.length; i++) {
            toles = roles[0].name
        }

        const token = jwt.sign({
            id: userFound._id,
            role: toles,
        }, config.SECRET, {
            expiresIn: '24d', // 24 hours
        });

        if (!userFound.modalidad) {
            userFound.modalidad = 'none';
        }
        const isaccesos = {
            tokens: token,
            foto: userFound.foto,
            nombre: userFound.fullname,
            email: userFound.email,
            modalidad: userFound.modalidad,
        }
        res.status(200).json({
            isaccesos
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const cuenta = async (req, res) => {
    try {
        const userFound = await User.findOne({
            _id: req.body.id
        });
        if (!userFound) return res.status(400).json({
            message: "User Not Found 1"
        });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(402).json({
                token: null,
                message: "Contraseña Invalida",
            });

        res.status(200).json({
            message: "Contraseña Correcta",
        });

    } catch (error) {
        return res.status(500).json(error);
    }

};

export const newPassword = async (req, res) => {

    try {
        req.body.password = await User.encryptPassword(req.body.password);
        const updatedPassword = await User.findByIdAndUpdate(
            req.params.cuentaId,
            req.body, {
            new: true,
        }
        );
        res.status(200).json(updatedPassword);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//RESET PASWWORF----------------------------------
const generateRandomString = (num) => {
    let result1 = Math.random().toString(36).substring(0, num);
    return result1;
}

export const resetPassword = async (req, res) => {
    try {
        const userFound = await User.findOne({
            email: req.body.email
        });
        if (!userFound) return res.status(400).json({
            message: "User Not Found 1"
        });
        let code = generateRandomString(6);
        ResetEmail.sendMail(req.body.email, code)
        res.status(200).json({
            code
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const userFound = await User.findOne({
            email: req.body.email
        });
        req.body.password = await User.encryptPassword(req.body.password);
        const updatedPassword = await User.findByIdAndUpdate(
            userFound._id,
            req.body, {
            new: true,
        });
        res.status(200).json(updatedPassword);
    } catch (err) {
        return res.status(500).json(err);
    }
};