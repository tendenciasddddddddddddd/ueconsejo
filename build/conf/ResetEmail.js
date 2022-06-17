"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodemailer = require('nodemailer');

var nodemailerSendgrid = require('nodemailer-sendgrid');

var ejs = require("ejs"); // const createTrans = () => {
//     const tansport = nodemailer.createTransport(
//         nodemailerSendgrid({
//             apiKey: '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'
//         }) 
//     );
//     return tansport;
// }


var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: 'unidadeducativa.pcei@gmail.com',
    // generated ethereal user
    pass: 'himxmjedflbpszjp' // generated ethereal password

  }
});

var sendMail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (user, code) {
    try {
      var data = yield ejs.renderFile(__dirname + "/resetTemplate.ejs", {
        codigo: code
      });
      yield transporter.sendMail({
        from: '"Mons. Leonidas Proaño" <unidadeducativa.pcei@gmail.com>',
        // sender address
        to: "".concat(user),
        subject: "Restablece tu contraseña de PCEI-tulcan",
        // Subject line
        html: data
      });
    } catch (error) {
      console.log('fallo email');
    }
  });

  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // const sendMails = async (user, code) => {
//     try {
//         const data = await ejs.renderFile(__dirname + "/resetTemplate.ejs", { codigo: code });
//         const trasporter = createTrans();
//         await trasporter.sendMail({
//             from : '"Mons. Leonidas Proaño"<esthelita.martinez98@gmail.com> ',
//             to : `${user}`,
//             subject : 'Restablece tu contraseña de PCEI',
//             html : data
//         });
//         console.log('Admin User Created!')
//         return
//     }catch (error) {
//         console.error('Error sending test email');
//         console.log(error);
//     }
// }


exports.sendMail = (user, code) => sendMail(user, code);