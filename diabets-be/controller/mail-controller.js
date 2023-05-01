const MailModel = require("../model/mail-model");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const userModel = require('../model/user-model');
exports.sendPasswordResetEmail = function (req, res) {
    const source = fs.readFileSync(path.resolve(__dirname, 'password-mail.html'), 'utf-8').toString();
    const template = handlebars.compile(source);
    let subject = "PASSWORD CHANGE";
    let payload = req.body;
    let receiver = payload.email;
    const replacements = {
        password: generatePassword()
    };
    payload.password = replacements.password;
    const htmlToSend = template(replacements);
    let mailOptions = {
        from: 'Diabetics <noreply-diabetics@diabetics.com>',
        to: receiver,
        subject: subject,
        html: htmlToSend
    };
    MailModel.transporter(mailOptions).then((sentMail) => {
        if (sentMail) {
            userModel.updatePassword(payload._id, payload)
                .then((response) => {
                    if (response) {
                        res.status(200).json({
                            data: response,
                            message: "An e-mail has been sent to " + receiver + " with temporary password"
                        });
                    }
                })
                .catch((error) => {
                    if (error && error.code === 1) {
                        res.status(404).json(error);
                    }
                    else {
                        res.status(500).json({ error: error.message });
                    }
                });
        }
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });
}

function generatePassword(){
        let password = '';
        let passwordPattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (let i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                        * passwordPattern.length + 1);
              
            password += passwordPattern.charAt(char)
        }
        return password;
};