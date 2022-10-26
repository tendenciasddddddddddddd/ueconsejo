"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = exports.getChildNacionalidad = exports.deleteNacionalidadById = exports.updateNacionalidadById = exports.getNacionalidadById = exports.getNacionalidad = exports.createNacionalidad = void 0;

var _Nacionalidad = _interopRequireDefault(require("../../models/Zonas/Nacionalidad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createNacionalidad = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre
    } = req.body;

    try {
      var newNacionalidad = new _Nacionalidad.default({
        nombre
      });
      var NacionalidadSaved = yield newNacionalidad.save();
      res.status(201).json(NacionalidadSaved);
    } catch (error) {
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
    try {
      var limit = parseInt(req.query.take);
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
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getNacionalidad(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getNacionalidad = getNacionalidad;

var getNacionalidadById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        nacionalidadId
      } = req.params;
      var provincias = yield _Nacionalidad.default.findById(nacionalidadId);
      res.status(200).json(provincias);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getNacionalidadById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNacionalidadById = getNacionalidadById;

var updateNacionalidadById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedNacionalidad = yield _Nacionalidad.default.findByIdAndUpdate(req.params.nacionalidadId, req.body, {
        new: true
      });
      res.status(200).json(updatedNacionalidad);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updateNacionalidadById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateNacionalidadById = updateNacionalidadById;

var deleteNacionalidadById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Nacionalidad.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteNacionalidadById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteNacionalidadById = deleteNacionalidadById;

var getChildNacionalidad = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var documentos = yield _Nacionalidad.default.find({}).lean();
      var coleccion = {
        datas: documentos
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getChildNacionalidad(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getChildNacionalidad = getChildNacionalidad;

var activate = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    try {
      var reg = yield _Nacionalidad.default.findByIdAndUpdate({
        _id: req.params.id
      }, {
        estado: req.query.state
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  });

  return function activate(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

exports.activate = activate;