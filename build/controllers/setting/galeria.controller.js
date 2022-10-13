"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteGaleriaById = exports.getGaleria = exports.createGaleria = void 0;

var _Galeria = _interopRequireDefault(require("../../models/setting/Galeria"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createGaleria = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      name
    } = req.body;

    try {
      var newGaleria = new _Galeria.default({
        name
      });
      var GaleriaSaved = yield newGaleria.save();
      res.status(201).json(GaleriaSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createGaleria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createGaleria = createGaleria;

var getGaleria = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take);
    var skip = parseInt(req.query.page);
    var total = yield _Galeria.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var usuarios = yield _Galeria.default.find({}).skip(limit * skip - limit).limit(limit).sort({
      updatedAt: -1
    });
    var coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getGaleria(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getGaleria = getGaleria;

var deleteGaleriaById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Galeria.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteGaleriaById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteGaleriaById = deleteGaleriaById;