"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByIdOfPeriodo = exports.getByIdOfCourseAndPeriod = exports.query = exports.getQueryAll = exports.deleteMatriculasMany = exports.deleteMigracionesById = exports.createMigracionMatricula = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

var _MigracionMatricula = _interopRequireDefault(require("../../models/Matricula/MigracionMatricula"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//-------------------CLONAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------
var createMigracionMatricula = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    _Matriculas.default.find().then(colecciones => {
      colecciones.forEach(array => {
        var nuewData = (0, _MigracionMatricula.default)(array);
        nuewData.isNew = true;
        nuewData.save();
      });
    });

    return res.json('Hecho');
  });

  return function createMigracionMatricula(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //-----------------------------------------------------------ELIMINAR MATRICULA CON MULTIPLES


exports.createMigracionMatricula = createMigracionMatricula;

var deleteMigracionesById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _MigracionMatricula.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteMigracionesById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //-------------------ELIMINAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------


exports.deleteMigracionesById = deleteMigracionesById;

var deleteMatriculasMany = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Matriculas.default.deleteMany();
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteMatriculasMany(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteMatriculasMany = deleteMatriculasMany;

var getQueryAll = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _MigracionMatricula.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var usuarios = yield _MigracionMatricula.default.find({}).skip(limit * skip - limit).limit(limit).populate('academico', 'nombre').populate('fknivel', 'nombre');
    var coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getQueryAll(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //--CONSULTAMOS POR NOMBRE LAS MATRICULAS DE HISTORY


exports.getQueryAll = getQueryAll;

var query = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var querys = req.query.querys;
      var result = yield _MigracionMatricula.default.find({
        nombre: {
          '$regex': querys,
          "$options": "i"
        }
      }).populate('academico', 'nombre').populate('fknivel', 'nombre');
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
    }
  });

  return function query(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.query = query;

var getByIdOfCourseAndPeriod = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    //RESUELVE LOS REPORTES
    var periodoId = req.query.periodoId;
    var courseId = req.query.courseId;
    var matriculas = yield _MigracionMatricula.default.find({
      academico: {
        $in: [periodoId]
      },
      fknivel: {
        $in: [courseId]
      }
    }).lean().populate('academico', 'nombre').populate('fknivel', 'nombre');
    return res.json(matriculas);
  });

  return function getByIdOfCourseAndPeriod(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getByIdOfCourseAndPeriod = getByIdOfCourseAndPeriod;

var getByIdOfPeriodo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    //RESUELVE LOS REPORTES
    var periodoId = req.query.periodoId;
    var matriculas = yield _MigracionMatricula.default.find({
      academico: {
        $in: [periodoId]
      }
    }).lean().populate('academico', 'nombre').populate('fknivel', 'nombre num');
    return res.json(matriculas);
  });

  return function getByIdOfPeriodo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getByIdOfPeriodo = getByIdOfPeriodo;