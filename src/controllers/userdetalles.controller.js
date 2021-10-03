import UserDetalle from "../models/UserDetalles";


//--------------------------------CREAR DETALLE ESTUDIANTE--------------------
  export const createDetalleEstudiante = async (req, res) => {

    try {
        // Getting the Request Body
       
        const {
            telefonofijo,calles,referencia,codigo,numeric,nombrec,edad, nacimineto,
            centroAtencio ,estadoEstudiant,tipoDocumnt, estadoCivi, tiposangre, 
            operado, carnet, parentesc, discapacidad,  detalles,
        } = req.body;
        // Creating a new User Object
        const newUser = new UserDetalle({
            telefonofijo,calles,referencia,codigo,numeric,nombrec,edad,nacimineto,
            centroAtencio ,estadoEstudiant,tipoDocumnt, estadoCivi, tiposangre, 
            operado, carnet, parentesc, discapacidad, detalles,

        });
        const savedUser = await newUser.save();

        return res.status(200).json({
            savedUser
        });
    } catch (error) {
        console.error(error);
        
    }
};