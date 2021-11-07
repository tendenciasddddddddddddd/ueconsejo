const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const ejs = require("ejs");


const createTrans = () => {
    const tansport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: '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'
        }) 
    );
    return tansport;
}



const sendMail = async (user, code) => {
    try {
        const data = await ejs.renderFile(__dirname + "/resetTemplate.ejs", { codigo: code });
        const trasporter = createTrans();
        await trasporter.sendMail({
            from : '"Mons. Leonidas Proaño"<10004095632w@gmail.com> ',
            to : `${user}`,
            subject : 'Restablece tu contraseña de PCEI',
            html : data
        });
        
        return
    }catch (error) {
        console.error('Error sending test email');
        console.log(error);
    }
    
}

exports.sendMail = (user, code) => sendMail(user, code);