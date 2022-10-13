"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListFiles = exports.downloadFiles = exports.resizeImages = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require("path");

var fs = require('fs');

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dvpp07pji',
  api_key: '752623184829383',
  api_secret: 'tVPTlqFeV1flLGndxDK-DS9exkw'
});

var storage = _multer.default.diskStorage({
  /*  destination: function (req, file, cb) {
        cb(null, 'src/static')
    }, */
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer.default)({
  storage: storage
});
exports.upload = upload.single("myFile");

var resizeImages = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    //let nombre = `${Date.now()}-${req.file.filename}`;
    var ext = path.extname(req.file.filename).toLowerCase();

    if (ext != ".png") {
      /* req.body.images = [];
      await sharp(req.file.path)
        .resize(200, 200)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`src/static/${nombre}`);
        req.body.images.push(nombre); */
      var resultado = yield cloudinary.v2.uploader.upload(req.file.path, {
        height: 128,
        crop: "thumb"
      });
      res.json(resultado.secure_url);
      next();
    } else {
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
    }
  });

  return function resizeImages(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.resizeImages = resizeImages;

exports.uploadFile = (req, res) => {
  res.json(req.file.name);
};

var downloadFiles = (req, res) => {
  var fileName = req.body.name;
  var path1 = path.join("src/static/");
  res.download(path1 + fileName, err => {
    if (err) {
      res.status(500).send({
        message: "File can not be downloaded: " + err
      });
    }
  });
}; //exportar todas las imagenes 


exports.downloadFiles = downloadFiles;

var getListFiles = (req, res) => {
  var directoryPath = path.join("src/static/");
  console.log(directoryPath);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!"
      });
    }

    var fileInfos = [];
    console.log(files);
    files.forEach(file => {
      fileInfos.push({
        name: file,
        url: directoryPath + file
      });
    });
    res.status(200).send(fileInfos);
  });
};

exports.getListFiles = getListFiles;