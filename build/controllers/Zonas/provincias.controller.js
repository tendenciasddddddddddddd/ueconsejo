"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProvinciasById = exports.updateProvinciasById = exports.getProvinciasById = exports.getProvincias = exports.createProvincias = void 0;

var _Provincias = _interopRequireDefault(require("../../models/Zonas/Provincias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProvincias = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado
    } = req.body;

    try {
      var newProvincias = new _Provincias.default({
        nombre,
        estado
      });
      var ProvinciasSaved = yield newProvincias.save();
      res.status(201).json(ProvinciasSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createProvincias(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProvincias = createProvincias;

var getProvincias = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _Provincias.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var usuarios = yield _Provincias.default.find({}).skip(limit * skip - limit).limit(limit).sort({
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

  return function getProvincias(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getProvincias = getProvincias;

var getProvinciasById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      provinciasId
    } = req.params;
    var provincias = yield _Provincias.default.findById(provinciasId);
    res.status(200).json(provincias);
  });

  return function getProvinciasById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProvinciasById = getProvinciasById;

var updateProvinciasById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updatedProvincias = yield _Provincias.default.findByIdAndUpdate(req.params.provinciasId, req.body, {
      new: true
    });
    res.status(200).json(updatedProvincias);
  });

  return function updateProvinciasById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateProvinciasById = updateProvinciasById;

var deleteProvinciasById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      provinciasId
    } = req.params;
    yield _Provincias.default.findByIdAndDelete(provinciasId); // code 200 is ok too

    res.status(200).json();
  });

  return function deleteProvinciasById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteProvinciasById = deleteProvinciasById;