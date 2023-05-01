'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
require('./database/connection');
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:8100'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

const user = require('./router/user-route');
const password = require('./router/password-route');
const mail = require('./router/mail-route');
const diabetics = require('./router/diabetic-route');

const questions_list = ["What is the name of a college you applied to but didn’t attend?",
    "What was the name of the first school you remember attending?",
    "Where was the destination of your most memorable school field trip?",
    "What was your math’s teacher's surname in your 8th year of school?",
    "What was the name of your first stuffed toy?",
    "What was your driving instructor's first name?"];
    
app.use('/api/v1/users',user);
app.get('/api/v1/questions', (req, res) => {
    res.status(200).json({ questions_list });
});
app.use('/api/v1/passwords',password);
app.use('/api/v1/forgotpassword',mail);
app.use('/api/v1/diabetics',diabetics);
app.listen(3001, () => {
    console.log(`server running at http://localhost:3001/api/v1/`);
});