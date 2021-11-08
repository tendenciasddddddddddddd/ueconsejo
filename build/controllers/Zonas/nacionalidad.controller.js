"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChildNacionalidad = exports.deleteNacionalidadById = exports.updateNacionalidadById = exports.getNacionalidadById = exports.getNacionalidad = exports.createNacionalidad = void 0;

var _Nacionalidad = _interopRequireDefault(require("../../models/Zonas/Nacionalidad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createNacionalidad = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado
    } = req.body;

    try {
      var newNacionalidad = new _Nacionalidad.default({
        nombre,
        estado
      });
      var NacionalidadSaved = yield newNacionalidad.save();
      res.status(201).json(NacionalidadSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createNacionalidad(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createNacionalidad = createNacionalidad;

var getNacionalidad = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _Nacionalidad.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var nacionalidad = yield _Nacionalidad.default.find({}).skip(limit * skip - limit).limit(limit).sort({
      updatedAt: -1
    });
    var coleccion = {
      datas: nacionalidad,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getNacionalidad(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getNacionalidad = getNacionalidad;

var getNacionalidadById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      nacionalidadId
    } = req.params;
    var provincias = yield _Nacionalidad.default.findById(nacionalidadId);
    res.status(200).json(provincias);
  });

  return function getNacionalidadById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNacionalidadById = getNacionalidadById;

var updateNacionalidadById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updatedNacionalidad = yield _Nacionalidad.default.findByIdAndUpdate(req.params.nacionalidadId, req.body, {
      new: true
    });
    res.status(200).json(updatedNacionalidad);
  });

  return function updateNacionalidadById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNacionalidadById = updateNacionalidadById;

var deleteNacionalidadById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      nacionalidadId
    } = req.params;
    yield _Nacionalidad.default.findByIdAndDelete(nacionalidadId); // code 200 is ok too

    res.status(200).json();
  });

  return function deleteNacionalidadById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //-------------------COMPONENTES CHILDS ------


exports.deleteNacionalidadById = deleteNacionalidadById;

var getChildNacionalidad = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var documentos = yield _Nacionalidad.default.find({}).lean();
    var coleccion = {
      datas: documentos
    };
    return res.json(coleccion);
  });

  return function getChildNacionalidad(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getChildNacionalidad = getChildNacionalidad;