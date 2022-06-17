import Paises from "../models/Paises";

export const createPaises = async (req,res)=>{
    const { nombre,estado } = req.body;
    try {
        const newPaises = new Paises({
          nombre,
          estado,
        });
    
        const PaisesSaved = await newPaises.save();
    
        res.status(201).json(PaisesSaved);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}