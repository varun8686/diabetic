const diabetic = require('../database/schema/diabetic');
const moment = require('moment');
exports.insertDiabetic = function (payload) {
    return new Promise((resolve, reject) => {
        diabetic.create(payload)
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

exports.retriveDiabetic = function (id) {
    return new Promise((resolve, reject) => {
        diabetic.find({ userId: id }).exec()
            .then((result) => {
                if (result) {
                    result.map((item) => {
                        item.timeBeforBf = moment(item.timeBeforBf, "hh:mm").format('h:mm A');
                        item.breakfastTime = moment(item.breakfastTime, "hh:mm").format('h:mm A');
                        item.lunchTime = moment(item.lunchTime, "hh:mm").format('h:mm A');
                        item.dinnerTime = moment(item.dinnerTime, "hh:mm").format('h:mm A');
                        item.timeAfter2hrDinner = moment(item.timeAfter2hrDinner, "hh:mm").format('h:mm A');
                    })
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

exports.modifyDiabetic = function (id,payload) {
    return new Promise((resolve, reject) => {
        diabetic.findByIdAndUpdate(id,payload,{new:true}).exec()
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