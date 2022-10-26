"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = exports.deletePeriodoById = exports.updatePeriodoById = exports.getPeriodoById = exports.getAllPeriodo = exports.getPeriodo = exports.createPeriodo = void 0;

var _Academicos = _interopRequireDefault(require("../../models/Matricula/Academicos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createPeriodo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado
    } = req.body;

    try {
      var newPeriodo = new _Academicos.default({
        nombre,
        estado
      });
      var PeriodoSaved = yield newPeriodo.save();
      res.status(201).json(PeriodoSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function createPeriodo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPeriodo = createPeriodo;

var getPeriodo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var limit = parseInt(req.query.take);
      var skip = parseInt(req.query.page);
      var total = yield _Academicos.default.countDocuments();
      var paginas = Math.ceil(total / limit);
      var perodos = yield _Academicos.default.find({}).skip(limit * skip - limit).limit(limit);
      var coleccion = {
        niveles: perodos,
        pagina: skip,
        paginas: paginas,
        total: total
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getPeriodo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPeriodo = getPeriodo;

var getAllPeriodo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var perodos = yield _Academicos.default.find().lean();
      var coleccion = {
        niveles: perodos
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getAllPeriodo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllPeriodo = getAllPeriodo;

var getPeriodoById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        periodoId
      } = req.params;
      var niveles = yield _Academicos.default.findById(periodoId);
      res.status(200).json(niveles);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getPeriodoById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getPeriodoById = getPeriodoById;

var updatePeriodoById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedMateria = yield _Academicos.default.findByIdAndUpdate(req.params.periodoId, req.body, {
        new: true
      });
      res.status(200).json(updatedMateria);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updatePeriodoById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updatePeriodoById = updatePeriodoById;

var deletePeriodoById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Academicos.default.deleteMany({
        _id: {
          $in: array
        }
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deletePeriodoById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deletePeriodoById = deletePeriodoById;

var activate = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      yield _Academicos.default.updateMany({}, {
        $set: {
          estado: 0
        }
      });
      var reg = yield _Academicos.default.findByIdAndUpdate({
        _id: req.params.id
      }, {
        estado: 1
      });
      res.status(200).json(reg);
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function activate(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.activate = activate;