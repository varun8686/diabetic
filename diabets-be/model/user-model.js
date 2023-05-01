const user = require('../database/schema/user');

exports.registerUser = function (payload) {
    return new Promise((resolve, reject) => {
        user.create(payload)
            .then((result) => {
                if (result) {
                    resolve(result);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.updatePassword = function (id,payload){
    return new Promise((resolve, reject) => {
        user.findByIdAndUpdate(id,{password:payload.password,passwordStatus:true},{new:true})
            .then((result) => {
                if (result) {
                    resolve(result);  
                }
                else{
                    reject({ error: `Account not found.`,code:1}); 
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.updateImageIndex = function (id,payload){
    return new Promise((resolve, reject) => {
        user.findByIdAndUpdate(id,{imageIndex:payload.imageIndex,imageStatus:true},{new:true})
            .then((result) => {
                if (result) {
                    resolve(result);  
                }
                else{
                    reject({ error: `Account not found.`,code:1}); 
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.retriveUser = function (payload) {
    const userName = payload.userName;
    const email = payload.email;
    return new Promise((resolve, reject) => {
        user.findOne({$or:[{userName:userName},{email:email}]}).exec()
            .then((result) => {
                if (result && result.password) {
                    const user = {
                        _id: result._id,
                        email: result.email,
                        userName: result.userName
                    }
                    resolve(user);
                }
                else{
                    if(!result){
                        reject({ error: `Account doesn't found.`,code:1}); 
                    }
                    else{
                        reject({error:`password doesn't exists`,code:2,id:result.id});
                    }
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.validateUserPassword = function(id,payload){
    return new Promise((resolve,reject)=>{
        user.findById(id).exec()
        .then((result)=>{
            if(result && result.password ===payload.password){
                resolve(result);
            }
            if(!result){
                reject({ error: `Account doesn't found.`,code:1}); 
            }
            else{
                reject({error:`Incorrect Password`,code:3,id:result._id});
            }
        })
        .catch((error)=>{
            reject(error);
        })
    });
}
exports.validateUser = function (payload) {
    const email = payload.email;
    const mobile = payload.mobile;
    const userName = payload.userName;
    return new Promise((resolve, reject) => {
        user.findOne({email:email,mobile:mobile,userName:userName}).select('_id')
            .then((result) => {
                if (result) {
                    resolve(result);  
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}