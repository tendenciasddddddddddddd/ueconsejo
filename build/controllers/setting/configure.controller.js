"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAplicaciones = exports.updatAplicacionesById = exports.getConfigure = exports.updateConfigureById = void 0;

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _Apps = _interopRequireDefault(require("../../models/Apps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateConfigureById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var updatedConfigure = yield _Configure.default.findByIdAndUpdate(req.params.Id, req.body, {
      new: true
    });
    res.status(200).json(updatedConfigure);
  });

  return function updateConfigureById(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateConfigureById = updateConfigureById;

var getConfigure = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var ress = yield _Configure.default.find();
    return res.json(ress);
  });

  return function getConfigure(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getConfigure = getConfigure;

var updatAplicacionesById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var updatedApps = yield _Apps.default.findByIdAndUpdate(req.params.Id, req.body, {
      new: true
    });
    res.status(200).json(updatedApps);
  });

  return function updatAplicacionesById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updatAplicacionesById = updatAplicacionesById;

var getAplicaciones = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var ress = yield _Apps.default.find();
    return res.json(ress);
  });

  return function getAplicaciones(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAplicaciones = getAplicaciones;