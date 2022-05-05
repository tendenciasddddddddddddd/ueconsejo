"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryAll = exports.deleteMatriculasMany = exports.createMigracionMatricula = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matricula/Matriculas"));

var _MigracionMatricula = _interopRequireDefault(require("../../models/Matricula/MigracionMatricula"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//-------------------CLONAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------
var createMigracionMatricula = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var version = req.query.modalidad;

    _Matriculas.default.find({
      "typo": version
    }).then(colecciones => {
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
}(); //-------------------ELIMINAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------


exports.createMigracionMatricula = createMigracionMatricula;

var deleteMatriculasMany = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var version = req.query.modalidad;
      yield _Matriculas.default.deleteMany({
        typo: {
          $in: version
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteMatriculasMany(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteMatriculasMany = deleteMatriculasMany;

var getQueryAll = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield Provincias.countDocuments();
    var paginas = Math.ceil(total / limit);
    var usuarios = yield _MigracionMatricula.default.find({}).skip(limit * skip - limit).limit(limit);
    var coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getQueryAll(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getQueryAll = getQueryAll;