import multer from "multer";
const path = require("path");
const fs = require('fs');

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dvpp07pji',
  api_key: '752623184829383',
  api_secret: 'tVPTlqFeV1flLGndxDK-DS9exkw',
});


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("myFile");

export const resizeImages = async (req, res, next) => {
  var ext = path.extname(req.file.filename).toLowerCase();
  if (ext == ".png" || ext == ".jpg" || ext == ".jpeg") {
    const resultado = await cloudinary.v2.uploader.upload(req.file.path, { height: 128, crop: "thumb" });
    res.json(resultado.secure_url);
    next();
  } else {
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    next();
  }
};

export const resizeImages2 = async (req, res, next) => {

  try {
      const resultado = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'tasks'});
      res.json(resultado.secure_url);
  } catch (error) {
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
  }   
};


