"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodemailer = require('nodemailer');

var ejs = require("ejs");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: 'ue.alfonsoherrera01@gmail.com',
    // generated ethereal user
    pass: 'uifmwveabrkvjhsz' // generated ethereal password

  }
});

var sendMail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (user, code) {
    try {
      var data = yield ejs.renderFile(__dirname + "/resetTemplate.ejs", {
        codigo: code
      });
      yield transporter.sendMail({
        from: '"UEM Alfonso Herrera" <ue.alfonsoherrera01@gmail.com>',
        to: "".concat(user),
        subject: "Restablece tu contraseña de plataforma-UEMAH",
        html: data
      });
    } catch (error) {
      console.log('fallo email');
    }
  });

  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var sendMail2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (user, code, name) {
    try {
      var data = yield ejs.renderFile(__dirname + "/resetPassWord.ejs", {
        codigo: code,
        name: name
      });
      yield transporter.sendMail({
        from: '"UEM Alfonso Herrera" <ue.alfonsoherrera01@gmail.com>',
        to: "".concat(user),
        subject: "Recuperar contraseña de plataforma-UEMAH",
        html: data
      });
    } catch (error) {
      console.log('fallo email');
    }
  });

  return function sendMail2(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendMail = (user, code) => sendMail(user, code);

exports.sendMail2 = (user, code, name) => sendMail2(user, code, name);