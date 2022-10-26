"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeImages2 = exports.resizeImages = void 0;

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
    var ext = path.extname(req.file.filename).toLowerCase();

    if (ext == ".png" || ext == ".jpg" || ext == ".jpeg") {
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

var resizeImages2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var resultado = yield cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'tasks'
      });
      res.json(resultado.secure_url);
    } catch (error) {
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
    }
  });

  return function resizeImages2(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.resizeImages2 = resizeImages2;