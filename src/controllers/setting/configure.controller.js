import Configure from "../../models/Configure";
import Apps from "../../models/Apps";

export const updateConfigureById = async (req,res)=>{
    const updatedConfigure = await Configure.findByIdAndUpdate(
        req.params.Id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedConfigure);
}

export const getConfigure = async (req,res)=>{
  const ress = await Configure.find();
  return res.json(ress);
}

export const updatAplicacionesById = async (req,res)=>{
  const updatedApps = await Apps.findByIdAndUpdate(
      req.params.Id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedApps);
}

export const getAplicaciones = async (req,res)=>{
const ress = await Apps.find();
return res.json(ress);
}

