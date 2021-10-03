"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMateriaById = exports.updateMateriaById = exports.getMateriaById = exports.getListasMaterias = exports.getMateria = exports.createMateria = void 0;

var _Materia = _interopRequireDefault(require("../../models/Gestion/Materia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createMateria = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado,
      icono,
      descripcion
    } = req.body;

    try {
      var newMateria = new _Materia.default({
        nombre,
        icono,
        descripcion,
        estado
      });
      var MateriaSaved = yield newMateria.save();
      res.status(201).json(MateriaSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createMateria(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createMateria = createMateria;

var getMateria = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _Materia.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var materias = yield _Materia.default.find({}).skip(limit * skip - limit).limit(limit);
    var coleccion = {
      niveles: materias,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getMateria(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //--------------------------------LISTA PARA FILTROS--------------------


exports.getMateria = getMateria;

var getListasMaterias = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var products = yield _Materia.default.find({}, {
      'nombre': true
    });
    return res.json(products);
  });

  return function getListasMaterias(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getListasMaterias = getListasMaterias;

var getMateriaById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      materiaId
    } = req.params;
    var niveles = yield _Materia.default.findById(materiaId);
    res.status(200).json(niveles);
  });

  return function getMateriaById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMateriaById = getMateriaById;

var updateMateriaById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var updatedMateria = yield _Materia.default.findByIdAndUpdate(req.params.materiaId, req.body, {
      new: true
    });
    res.status(200).json(updatedMateria);
  });

  return function updateMateriaById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateMateriaById = updateMateriaById;

var deleteMateriaById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var {
      materiaId
    } = req.params;
    yield _Materia.default.findByIdAndDelete(materiaId); // code 200 is ok too

    res.status(200).json();
  });

  return function deleteMateriaById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteMateriaById = deleteMateriaById;