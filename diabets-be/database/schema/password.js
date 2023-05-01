const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const password_schema = new Schema({
    password_questions: [
        {
            type: Schema.Types.String,
            require: true,
        }
    ],
    password_answers: [
        {
            type: Schema.Types.String,
            require: true,
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        unique:true,
        index:true,
        ref: 'User'
    }
    
},
    {
        strict: true,
        versionKey: false,
        timestamps: true,
        usePushEach: true
    }
);

module.exports = mongoose.model('Password', password_schema);