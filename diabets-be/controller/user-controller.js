const userModel = require('../model/user-model');

exports.createUser = function (req, res) {
    const payload = req.body;
    userModel.registerUser(payload)
        .then((response) => {
            if (response) {
                res.status(201).json(response);
            }
        })
        .catch((error) => {
            if (error.code===11000) {
                const field = Object.keys(error.keyValue);
                const message = `An account with that ${field} already exists.`;
                res.status(409).json({ error: field[0]==='email' ? `${message} please Login.` : message });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        });
}

exports.changePassword = function(req,res){
    const _id = req.params.id;
    const payload = req.body;
    userModel.updatePassword(_id,payload)
    .then((response) =>{
        if(response){
            res.status(200).json(response);
        }
    })
    .catch((error)=>{
        if (error && error.code===1) {
            res.status(404).json(error);
        }
        else {
            res.status(500).json({ error: error.message });
        }
    });
}

exports.changeImageIndex = function(req,res){
    const _id = req.params.id;
    const payload = req.body;
    userModel.updateImageIndex(_id,payload)
    .then((response) =>{
        if(response){
            res.status(200).json(response);
        }
    })
    .catch((error)=>{
        if (error && error.code===1) {
            res.status(404).json(error);
        }
        else {
            res.status(500).json({ error: error.message });
        }
    });
}

exports.readUser = function(req,res){
    const payload = req.body;
    userModel.retriveUser(payload)
        .then((response) => {
            if (response) {
                response.passwordExist = true;
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            if (error && error.code && (error.code === 1 || error.code === 2)) {
                res.status(404).json(error);
            }
            else{
                res.status(500).json({error:error.message});
            }
        });
}

exports.checkUserPassword = function(req,res){
    const {id} = req.body;
    const payload = req.body;
    userModel.validateUserPassword(id,payload)
    .then((response) =>{
        if(response){
            res.status(200).json(response);
        }
    })
    .catch((error)=>{
        if (error && error.code && (error.code === 1 || error.code === 3)) {
            res.status(404).json(error);
        }
        else {
            res.status(500).json({ error: error.message });
        }
    });
}

exports.checkUserStatus = function(req,res){
    const payload = req.body;
    userModel.retriveUser(payload)
        .then((response) => {
            if (response) {
                response.userExist = true
                res.status(200).json(response);
            }
            else{
                res.status(404).json({error:`Account doesn't exists`});
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

