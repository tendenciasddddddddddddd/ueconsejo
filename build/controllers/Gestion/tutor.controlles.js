"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfoTutor = exports.getAllTutor = exports.createArrayTutor = void 0;

var _Tutor = _interopRequireDefault(require("../../models/Gestion/Tutor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//-------------------------------------------------INSERTA TODO EL DISTRIBUTIVO TUTORES--------------------------------------------
var createArrayTutor = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;

      if (array.length != 0) {
        yield _Tutor.default.deleteMany();
        var options = {
          ordered: false
        };
        yield _Tutor.default.insertMany(array, options);
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

  return function createArrayTutor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //-------------------------------------------------ENLISTA TODO EL DISTRIBUTIVO PARA EDITARLO AG-GRID--------------------------------------------


exports.createArrayTutor = createArrayTutor;

var getAllTutor = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _Tutor.default.find().populate('fdocente', 'fullname').populate('fnivel', 'nombre');
      return res.json(result);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getAllTutor(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //-------------------------------------------------ENLISTA DISTRIBUTIVO PARA DOCENTES TUTORES--------------------------------------------


exports.getAllTutor = getAllTutor;

var getInfoTutor = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var idDocente = req.query.id;
      var tutoes = yield _Tutor.default.find({
        fdocente: {
          $in: [idDocente]
        }
      }).select({
        paralelo: 1
      }).populate('fnivel', 'nombre');
      return res.json(tutoes);
    } catch (error) {
      return res.status(500).json();
    }
  });

  return function getInfoTutor(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getInfoTutor = getInfoTutor;