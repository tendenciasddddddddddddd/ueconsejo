"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getlistaCantones = exports.deleteParroquiasById = exports.updateParroquiasById = exports.getParroquiasById = exports.getParroquias = exports.createParroquias = void 0;

var _Cantones = _interopRequireDefault(require("../../models/Zonas/Cantones"));

var _Parroquias = _interopRequireDefault(require("../../models/Zonas/Parroquias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createParroquias = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado,
      fkCanton,
      cant
    } = req.body;

    try {
      var newParroquias = new _Parroquias.default({
        nombre,
        estado,
        fkCanton,
        cant
      });
      var ParroquiasSaved = yield newParroquias.save();
      res.status(201).json(ParroquiasSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createParroquias(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createParroquias = createParroquias;

var getParroquias = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _Parroquias.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var usuarios = yield _Parroquias.default.find({}).skip(limit * skip - limit).limit(limit).sort({
      updatedAt: -1
    });
    var coleccion = {
      datas: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getParroquias(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getParroquias = getParroquias;

var getParroquiasById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      parroquiasId
    } = req.params;
    var parroquias = yield _Parroquias.default.findById(parroquiasId);
    res.status(200).json(parroquias);
  });

  return function getParroquiasById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getParroquiasById = getParroquiasById;

var updateParroquiasById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updatedParroquias = yield _Parroquias.default.findByIdAndUpdate(req.params.parroquiasId, req.body, {
      new: true
    });
    res.status(200).json(updatedParroquias);
  });

  return function updateParroquiasById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateParroquiasById = updateParroquiasById;

var deleteParroquiasById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Parroquias.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteParroquiasById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //-----------------------OPTENEMOS LISTA COMPLETA DE LAS PROVINCIAS 


exports.deleteParroquiasById = deleteParroquiasById;

var getlistaCantones = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var provincia = yield _Cantones.default.find({
      estado: {
        $in: ["1"]
      }
    }, {
      'nombre': true
    });
    return res.json(provincia);
  });

  return function getlistaCantones(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getlistaCantones = getlistaCantones;