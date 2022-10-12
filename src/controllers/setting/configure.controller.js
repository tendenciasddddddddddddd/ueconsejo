import Configure from "../../models/Configure";

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

