"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Nivel = _interopRequireDefault(require("../../models/Gestion/Nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  createNivel: function () {
    var _createNivel = _asyncToGenerator(function* (req, res) {
      var {
        nombre,
        num
      } = req.body;

      try {
        var newNiveles = new _Nivel.default({
          nombre,
          num
        });
        var NivelesSaved = yield newNiveles.save();
        res.status(201).json(NivelesSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function createNivel(_x, _x2) {
      return _createNivel.apply(this, arguments);
    }

    return createNivel;
  }(),
  getNivel: function () {
    var _getNivel = _asyncToGenerator(function* (req, res) {
      var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

      var skip = parseInt(req.query.page);
      var total = yield _Nivel.default.countDocuments();
      var paginas = Math.ceil(total / limit);
      var niveles = yield _Nivel.default.find().skip(limit * skip - limit).limit(limit).lean();
      var coleccion = {
        niveles: niveles,
        pagina: skip,
        paginas: paginas,
        total: total
      };
      return res.json(coleccion);
    });

    function getNivel(_x3, _x4) {
      return _getNivel.apply(this, arguments);
    }

    return getNivel;
  }(),
  getListasNiveles: function () {
    var _getListasNiveles = _asyncToGenerator(function* (req, res) {
      var products = yield _Nivel.default.find().lean().select({
        nombre: 1,
        num: 1
      });
      return res.json(products);
    });

    function getListasNiveles(_x5, _x6) {
      return _getListasNiveles.apply(this, arguments);
    }

    return getListasNiveles;
  }(),
  getNivelById: function () {
    var _getNivelById = _asyncToGenerator(function* (req, res) {
      var {
        id
      } = req.params;
      var niveles = yield _Nivel.default.findById(id);
      res.status(200).json(niveles);
    });

    function getNivelById(_x7, _x8) {
      return _getNivelById.apply(this, arguments);
    }

    return getNivelById;
  }(),
  updateNivelById: function () {
    var _updateNivelById = _asyncToGenerator(function* (req, res) {
      var updatedNivel = yield _Nivel.default.findByIdAndUpdate(req.params.nivelId, req.body, {
        new: true
      });
      res.status(200).json(updatedNivel);
    });

    function updateNivelById(_x9, _x10) {
      return _updateNivelById.apply(this, arguments);
    }

    return updateNivelById;
  }(),
  deleteNivelById: function () {
    var _deleteNivelById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Nivel.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteNivelById(_x11, _x12) {
      return _deleteNivelById.apply(this, arguments);
    }

    return deleteNivelById;
  }(),
  activate: function () {
    var _activate = _asyncToGenerator(function* (req, res, next) {
      try {
        var reg = yield _Nivel.default.findByIdAndUpdate({
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

    function activate(_x13, _x14, _x15) {
      return _activate.apply(this, arguments);
    }

    return activate;
  }()
};
exports.default = _default;