const password = require('../database/schema/password');
const user = require('../database/schema/user');
exports.insertPasswordQuestions = function (payload) {
    const userId = payload.userId;
    return new Promise((resolve, reject) => {
        user.findByIdAndUpdate(userId, { questionsStatus: true })
            .then((response) => {
                if (response && response._id == userId) {
                    password.create(payload)
                        .then((result) => {
                            if (result) {
                                resolve(result);
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
                else {
                    reject({ error: `User Account not found .`, code: 1 });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.readPasswordQuestions = function (id) {
    return new Promise((resolve, reject) => {
        password.findOne({userId:id}).select('-_id').populate('userId')
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

exports.modifyPasswordQuestions = function (id,payload) {
    return new Promise((resolve, reject) => {
        password.findOneAndUpdate({userId:id},payload,{new:true}).populate('userId')
            .then((result) => {
                if (result) {
                    resolve(result);
                }
                else {
                    reject({ error: `User Account doesn't found.`, code: 1 });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}
