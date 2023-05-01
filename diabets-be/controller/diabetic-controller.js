const diabeticModel = require('../model/diabetic-model');

exports.createDiabetic = function (req, res) {
    const payload = req.body;
    diabeticModel.insertDiabetic(payload)
        .then((response) => {
            if (response) {
                res.status(201).json(response);
            }
        })
        .catch((error) => {
                res.status(500).json({ error: error.message });
        });
}

exports.readDiabetic = function (req, res) {
    const userId = req.params.userId;
    diabeticModel.retriveDiabetic(userId)
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

exports.updateDiabetic = function (req, res) {
    const userId = req.params.userId;
    const payload = req.body;
    diabeticModel.modifyDiabetic(userId,payload)
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