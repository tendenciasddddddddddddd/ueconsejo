const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const ejs = require("ejs");


// const createTrans = () => {
//     const tansport = nodemailer.createTransport(
//         nodemailerSendgrid({
//             apiKey: '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'
//         }) 
//     );
//     return tansport;
// }

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'unidadeducativa.pcei@gmail.com', // generated ethereal user
      pass: 'himxmjedflbpszjp', // generated ethereal password
    },
  });

const sendMail = async (user, code) => {
    try {
        const data = await ejs.renderFile(__dirname + "/resetTemplate.ejs", { codigo: code });
        await transporter.sendMail({
            from: '"Mons. Leonidas Proaño" <unidadeducativa.pcei@gmail.com>', // sender address
            to : `${user}`,
            subject: "Restablece tu contraseña de PCEI-tulcan", // Subject line
            html : data
          });
          
    } catch (error) {
        console.log('fallo email');
    }

}



// const sendMails = async (user, code) => {
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