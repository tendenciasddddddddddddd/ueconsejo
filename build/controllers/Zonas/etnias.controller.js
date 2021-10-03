"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEtniasById = exports.updateEtniasById = exports.getEtniasById = exports.getEtnias = exports.createEtnias = void 0;

var _Etnias = _interopRequireDefault(require("../../models/Zonas/Etnias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createEtnias = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      nombre,
      estado
    } = req.body;

    try {
      var newEtnias = new _Etnias.default({
        nombre,
        estado
      });
      var EtniasSaved = yield newEtnias.save();
      res.status(201).json(EtniasSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function createEtnias(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createEtnias = createEtnias;

var getEtnias = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _Etnias.default.countDocuments();
    var paginas = Math.ceil(total / limit);
    var etnias = yield _Etnias.default.find({}).skip(limit * skip - limit).limit(limit).sort({
      updatedAt: -1
    });
    var coleccion = {
      datas: etnias,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getEtnias(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getEtnias = getEtnias;

var getEtniasById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      etniasId
    } = req.params;
    var etnias = yield _Etnias.default.findById(etniasId);
    res.status(200).json(etnias);
  });

  return function getEtniasById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEtniasById = getEtniasById;

var updateEtniasById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var updatedEtnias = yield _Etnias.default.findByIdAndUpdate(req.params.etniasId, req.body, {
      new: true
    });
    res.status(200).json(updatedEtnias);
  });

  return function updateEtniasById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateEtniasById = updateEtniasById;

var deleteEtniasById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var {
      etniasId
    } = req.params;
    yield _Etnias.default.findByIdAndDelete(etniasId); // code 200 is ok too

    res.status(200).json();
  });

  return function deleteEtniasById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteEtniasById = deleteEtniasById;