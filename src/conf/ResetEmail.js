const nodemailer = require('nodemailer');
const ejs = require("ejs");



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'uehuaca@gmail.com', // generated ethereal user
      pass: 'sizlthxdkjwymoie', // generated ethereal password
    },
  });

const sendMail = async (user, code) => {
    try {
        const data = await ejs.renderFile(__dirname + "/resetTemplate.ejs", { codigo: code });
        await transporter.sendMail({
            from: '"UE HUACA" <uehuaca@gmail.com>', 
            to : `${user}`,
            subject: "Restablece tu contraseña de plataforma-UEHUACA", 
            html : data
          });
          
    } catch (error) {
        console.log('fallo email');
    }


   
}
const sendMail2 = async (user, code, name) => {
  try {
      const data = await ejs.renderFile(__dirname + "/resetPassWord.ejs", { codigo: code, name:name });
      await transporter.sendMail({
          from: '"UE HUACA" <uehuaca@gmail.com>', 
          to : `${user}`,
          subject: "Recuperar contraseña de plataforma-UEHUACA", 
          html : data
        });
        
  } catch (error) {
      console.log('fallo email');
  }

}

exports.sendMail = (user, code) => sendMail(user, code);
exports.sendMail2 = (user, code, name) => sendMail2(user, code, name);