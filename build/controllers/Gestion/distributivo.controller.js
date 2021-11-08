"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDistributivoById = exports.updateDistributivoById = exports.getDistributivoById = exports.getInfoDistributivo = exports.getDistributivo = exports.createDistributivo = void 0;

var _Distributivo = _interopRequireDefault(require("../../models/Gestion/Distributivo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createDistributivo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      fnivel,
      fdocente,
      icono,
      fmateria,
      facademicos,
      paralelo
    } = req.body;

    try {
      var newMateria = new _Distributivo.default({
        nombre,
        icono,
        fnivel,
        fdocente,
        fmateria,
        facademicos,
        paralelo
      });
      var DistributivoSaved = yield newMateria.save();
      res.status(201).json(DistributivoSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createDistributivo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createDistributivo = createDistributivo;

var getDistributivo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var modal = req.query.modal;
    var total = yield _Distributivo.default.countDocuments({
      nombre: {
        $in: [modal]
      }
    });
    var paginas = Math.ceil(total / limit);
    var materias = yield _Distributivo.default.find({
      nombre: {
        $in: [modal]
      }
    }).skip(limit * skip - limit).limit(limit).sort({
      updatedAt: -1
    }).populate('fdocente', 'fullname').populate('fmateria', 'nombre').populate('fnivel', 'nombres');
    var coleccion = {
      niveles: materias,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getDistributivo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDistributivo = getDistributivo;

var getInfoDistributivo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    //RESUELVE LA LISTA DE CURSOS PARA DOCENTE
    var idDocente = req.query.id;
    var distributivo = yield _Distributivo.default.find({
      fdocente: {
        $in: [idDocente]
      }
    }).select({
      nombre: 1,
      paralelo: 1
    }).populate('fmateria', 'nombre').populate('fnivel', 'nombres');
    return res.json(distributivo);
  });

  return function getInfoDistributivo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getInfoDistributivo = getInfoDistributivo;

var getDistributivoById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      distributivoId
    } = req.params;
    var niveles = yield _Distributivo.default.findById(distributivoId).populate('fmateria', 'nombre').populate('fnivel', 'nombres');
    res.status(200).json(niveles);
  });

  return function getDistributivoById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getDistributivoById = getDistributivoById;

var updateDistributivoById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var updateddistributivo = yield _Distributivo.default.findByIdAndUpdate(req.params.distributivoId, req.body, {
      new: true
    });
    res.status(200).json(updateddistributivo);
  });

  return function updateDistributivoById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateDistributivoById = updateDistributivoById;

var deleteDistributivoById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Distributivo.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteDistributivoById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteDistributivoById = deleteDistributivoById;