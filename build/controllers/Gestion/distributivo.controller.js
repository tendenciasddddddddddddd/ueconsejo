"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDistributivoById = exports.updatePlanificacionById = exports.updateDistributivoById = exports.getPlanificacionById = exports.getDistributivoById = exports.getInfoDistributivo = exports.getAllDistributivo = exports.getDistributivo = exports.createArrayDistributivo = exports.createDistributivo = void 0;

var _Distributivo = _interopRequireDefault(require("../../models/Gestion/Distributivo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createDistributivo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      fnivel,
      fdocente,
      fmateria,
      paralelo
    } = req.body;

    try {
      var newMateria = new _Distributivo.default({
        fnivel,
        fdocente,
        fmateria,
        paralelo,
        planificacion: ''
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
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.createDistributivo = createDistributivo;

var createArrayDistributivo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      if (array.length != 0) {
        yield _Distributivo.default.deleteMany();
        var options = {
          ordered: false
        };
        yield _Distributivo.default.insertMany(array, options);
      }

      return res.status(200).json({
        'docs': 'docs'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Problem'
      });
    }
  });

  return function createArrayDistributivo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createArrayDistributivo = createArrayDistributivo;

var getDistributivo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take);
    var skip = parseInt(req.query.page);
    var total = yield _Distributivo.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var materias = yield _Distributivo.default.find().skip(limit * skip - limit).limit(limit).populate('fdocente', 'fullname').populate('fmateria', 'nombre').populate('fnivel', 'nombre');
    var coleccion = {
      niveles: materias,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getDistributivo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getDistributivo = getDistributivo;

var getAllDistributivo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _Distributivo.default.find().populate('fdocente', 'fullname').populate('fmateria', 'nombre').populate('fnivel', 'nombre');
      return res.json(result);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getAllDistributivo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllDistributivo = getAllDistributivo;

var getInfoDistributivo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    //RESUELVE LA LISTA DE CURSOS PARA DOCENTE
    var idDocente = req.query.id;
    var distributivo = yield _Distributivo.default.find({
      fdocente: {
        $in: [idDocente]
      }
    }).select({
      nombre: 1,
      paralelo: 1,
      planificacion: 1
    }).populate('fmateria', 'nombre area').populate('fnivel', 'nombre');
    return res.json(distributivo);
  });

  return function getInfoDistributivo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getInfoDistributivo = getInfoDistributivo;

var getDistributivoById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var {
      distributivoId
    } = req.params;
    var niveles = yield _Distributivo.default.findById(distributivoId).populate('fmateria', 'nombre').populate('fnivel', 'nombre');
    res.status(200).json(niveles);
  });

  return function getDistributivoById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getDistributivoById = getDistributivoById;

var getPlanificacionById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var {
      distributivoId
    } = req.params;
    var niveles = yield _Distributivo.default.findById(distributivoId);
    res.status(200).json(niveles);
  });

  return function getPlanificacionById(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getPlanificacionById = getPlanificacionById;

var updateDistributivoById = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var updateddistributivo = yield _Distributivo.default.findByIdAndUpdate(req.params.distributivoId, req.body, {
      new: true
    });
    res.status(200).json(updateddistributivo);
  });

  return function updateDistributivoById(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.updateDistributivoById = updateDistributivoById;

var updatePlanificacionById = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    var updateddistributivo = yield _Distributivo.default.findByIdAndUpdate(req.params.distributivoId, req.body, {
      new: true
    });
    res.status(200).json(updateddistributivo);
  });

  return function updatePlanificacionById(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updatePlanificacionById = updatePlanificacionById;

var deleteDistributivoById = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
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

  return function deleteDistributivoById(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteDistributivoById = deleteDistributivoById;