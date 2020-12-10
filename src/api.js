const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
//const { ClientEncryption } = require('mongodb-client-encryption');
const bodyParser = require("body-parser");
//const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

const db = require('../config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const User = require('../models/User');

app.use(express.json());
app.use(express.urlencoded({extended : false})); 

const router = express.Router(); 



router.get('/', (req,res) => {
    // res.json({
    //     'Hello' : 'World'
    // });
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.status(200).send({'word' : 'Hello World'});
    User.findOne({email: "brianzkee8711@gmail.com"}).then((user) => {
        if(user){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send({'word' : user.email});
        }else {        
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send({'word' : 'World'});
        }
    });
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.status(200).send({'word' : 'World'});
    //return {'word' : 'Hello World'};
    //res.render('index', {title: 'Welcome to Netlify-Express!'}); 
});

router.get('/test', (req,res) => { 
    // res.json({
    //     'Hello' : 'test'
    // });
    // console.log(msg);
    const msg = "Hello Bryxki to!";
    //errors.push(req.flash('error'));
    // console.log('error: ' + req.flash('error'));
    // console.log('error_msg: ' + req.flash('error_msg'));
    res.render('test');
    
});

app.use('/.netlify/functions/api',  router);
//app.use('/api',  router);

module.exports.handler = serverless(app);