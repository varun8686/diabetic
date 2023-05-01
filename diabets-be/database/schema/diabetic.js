const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const diabetics_schema = new Schema({
    date: {
        type: Schema.Types.Date,
        require: true
    },
    timeBeforBf:{
        type: Schema.Types.String,
    },
    suguarlevelBeforeBf: {
        type: Schema.Types.Number,
        maxLength: 4,
    },
    breakfastTime: {
        type: Schema.Types.String,
    },
    breakfastFood: {
        type: Schema.Types.String,
    },
    lunchTime:{
        type: Schema.Types.String,
    },
    lunchFood:{
        type: Schema.Types.String,
    },
    dinnerTime:{
        type: Schema.Types.String,
    },
    dinnerFood:{
        type: Schema.Types.String,
    },
    timeAfter2hrDinner:{
        type: Schema.Types.String,
    },
    sugarLevelAfter2hrDinner:{
        type: Schema.Types.Number,
    },
    userId:{
        type:Schema.Types.ObjectId,
        index:true,
        ref:'User'
    }
},
    {
        strict: true,
        versionKey: false,
        timestamps: true,
        usePushEach: true
    }
);

module.exports = mongoose.model('Diabetic', diabetics_schema);