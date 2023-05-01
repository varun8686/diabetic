const passwordModel = require('../model/password-model');

exports.createPasswordQuestions = function (req, res) {
    const payload = req.body;
    passwordModel.insertPasswordQuestions(payload)
        .then((response) => {
            if (response) {
                res.status(201).json(response);
            }
            else{
                res.status(409).json({error:'Password exists for this user'});
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

exports.getPasswordQuestions = function (req, res) {
    const id = req.params.id;
    passwordModel.readPasswordQuestions(id)
        .then((response) => {
            if (response) {
                res.status(200).json(response);
            }
            else{
                res.status(400).json({error:'No passwords'});
            }
        })
        .catch((error) => {
            res.status(500).json({error:error.message});
        });
}

exports.updatePasswordQuestions = function (req, res) {
    const userId = req.params.userId;
    const payload = req.body;
    passwordModel.modifyPasswordQuestions(userId,payload)
        .then((response) => {
            if (response) {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            if (error && error.code && error.code === 1) {
                res.status(404).json(error);
            }
            else {
                res.status(500).json({ error: error.message });
            }
        });
}