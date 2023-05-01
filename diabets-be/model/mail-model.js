const nodemailer = require('nodemailer'); 
// declare vars 
// auth var 
smtpConfig = { 
    host: 'smtp.ionos.com', 
    port: 465, 
    secure: true, // use SSL 
    auth: { 
        user: 'support@diabetic.com', 
        pass: 'diabetic@123' 
    } 
}; 
const transporter = nodemailer.createTransport(smtpConfig); 
// email options 
exports.transporter = function (mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            })
    });
}