"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodemailer = require('nodemailer');

var nodemailerSendgrid = require('nodemailer-sendgrid');

var ejs = require("ejs");

var createTrans = () => {
  var tansport = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: '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'
  }));
  return tansport;
};

var sendMail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (user, code) {
    try {
      var data = yield ejs.renderFile(__dirname + "/resetTemplate.ejs", {
        codigo: code
      });
      var trasporter = createTrans();
      yield trasporter.sendMail({
        from: '"Mons. Leonidas Proaño"<esthelita.martinez98@gmail.com> ',
        to: "".concat(user),
        subject: 'Restablece tu contraseña de PCEI',
        html: data
      });
      return;
    } catch (error) {
      console.error('Error sending test email');
    }
  });

  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendMail = (user, code) => sendMail(user, code);