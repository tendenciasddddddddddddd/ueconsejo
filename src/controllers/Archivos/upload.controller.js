import multer from "multer";
const path = require("path");
const fs = require('fs');

const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'ds7xbwpoo', 
  api_key: '536636236264758', 
  api_secret: 'b2QWTg4MG2HCF8c3M8lkWHC2wwg' 
});


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("myFile");

export const resizeImages = async (req, res, next) => {
  try {
    var ext = path.extname(req.file.filename).toLowerCase();
      const resultado = await cloudinary.v2.uploader.upload(req.file.path, { height: 128, crop: "thumb" });
      res.json(resultado.secure_url);
      next();
  } catch (error) {
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
  }
 
};

export const resizeImages2 = async (req, res, next) => {

  try {
      const resultado = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'tasks', height: 450});
      res.json(resultado.secure_url);
  } catch (error) {
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
  }   
};


