"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteNivelById = exports.updateNivelById = exports.getNivelById = exports.getListasNiveles = exports.getNivel = exports.createNivel = void 0;

var _Nivel = _interopRequireDefault(require("../../models/Gestion/Nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createNivel = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombres,
      estado,
      modalidad
    } = req.body;

    try {
      var newNiveles = new _Nivel.default({
        nombres,
        modalidad,
        estado
      });
      var NivelesSaved = yield newNiveles.save();
      res.status(201).json(NivelesSaved);
    } catch (error) {
      //console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createNivel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNivel = createNivel;

var getNivel = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    //CONSULTA OPTIMIZADA
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _Nivel.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var niveles = yield _Nivel.default.find().skip(limit * skip - limit).limit(limit).lean();
    var coleccion = {
      niveles: niveles,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getNivel(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getNivel = getNivel;

var getListasNiveles = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    //CONSULTA OPTIMIZADA
    var products = yield _Nivel.default.find().lean().select({
      modalidad: 1,
      nombres: 1
    });
    return res.json(products);
  });

  return function getListasNiveles(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getListasNiveles = getListasNiveles;

var getNivelById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var niveles = yield _Nivel.default.findById(id);
    res.status(200).json(niveles);
  });

  return function getNivelById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getNivelById = getNivelById;

var updateNivelById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var updatedNivel = yield _Nivel.default.findByIdAndUpdate(req.params.nivelId, req.body, {
      new: true
    });
    res.status(200).json(updatedNivel);
  });

  return function updateNivelById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateNivelById = updateNivelById;

var deleteNivelById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Nivel.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteNivelById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteNivelById = deleteNivelById;