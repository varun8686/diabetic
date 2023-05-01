const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user_schema = new Schema({
    fullName: {
        type: Schema.Types.String,
        require: true
    },
    email: {
        type: Schema.Types.String,
        trim: true,
        unique: true,
        lowercase: true
    },
    mobile: {
        type: Schema.Types.String,
        require: true,
        maxLength: 10,
        unique:true
    },
    dateOfBirth: {
        type: Schema.Types.Date,
        require: true
    },
    userName: {
        type: Schema.Types.String,
        require: true,
        unique: true,
        index: true,
        sparse: true,
        select: true
    },
    password:{
        type: Schema.Types.String,
        require: true,
    },
    imageIndex:{
        type: Schema.Types.Number,
        require:false,
        default:0
    },
    passwordStatus:{
        type: Schema.Types.Boolean,
        default:false
    },
    questionsStatus:{
        type: Schema.Types.Boolean,
        default:false
    },
    imageStatus:{
        type: Schema.Types.Boolean,
        default:false
    }
},
    {
        strict: true,
        versionKey: false,
        timestamps: true,
        usePushEach: true
    }
);

module.exports = mongoose.model('User', user_schema);