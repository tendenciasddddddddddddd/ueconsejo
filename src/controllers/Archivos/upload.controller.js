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
  /*  destination: function (req, file, cb) {
        cb(null, 'src/static')
    }, */
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("myFile");

export const resizeImages = async (req, res, next) => {
  
  //let nombre = `${Date.now()}-${req.file.filename}`;
  var ext = path.extname(req.file.filename).toLowerCase();
  if (ext!= ".png" ) {
    /* req.body.images = [];
   await sharp(req.file.path)
      .resize(200, 200)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`src/static/${nombre}`);

    req.body.images.push(nombre); */
   const resultado = await cloudinary.v2.uploader.upload(req.file.path, { height: 128, crop: "thumb" });
   res.json(resultado.secure_url);

    next();
  }else{
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");

    next();
  }
};

exports.uploadFile = (req, res) => {
  res.json(req.file.name);
};

export const downloadFiles = (req, res) => {
  const fileName = req.body.name;
  const path1 = path.join("src/static/");

  res.download(path1 + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "File can not be downloaded: " + err,
      });
    }
  });
};
//exportar todas las imagenes 
export const getListFiles = (req, res) => {
  const directoryPath = path.join("src/static/");
  console.log(directoryPath)
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];
   console.log(files);
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: directoryPath + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};
