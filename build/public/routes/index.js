"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var router = express.Router();
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    res.render('index', {});
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/about', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    res.render('about', {});
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/event', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    res.render('event', {});
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/galeria', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    res.render('galeria', {});
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
module.exports = router;