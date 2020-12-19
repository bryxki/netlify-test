const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).send({'word' : 'Hello World'});

    // User.findOne({email: "brianzkee8711@gmail.com"}).then((user) => {
    //     if(user){
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //         res.status(200).send({'word' : user.name});
    //     }else {        
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //         res.status(200).send({'word' : 'World'});
    //     }
    // });

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.status(200).send({'word' : 'World'});
    //return {'word' : 'Hello World'};
    //res.render('index', {title: 'Welcome to Netlify-Express!'}); 
    //res.status(200).send({'word' : 'World'});
});

router.post('/login', (req,res) => { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const {email, password} = req.body;
    User.findOne({email: email}).then((user) => {
        if(user){
            if (user.password == password){
                res.status(200).send({'user' : user.email + ' login success'});
            }else{
                res.status(200).send("invalid credentials" + email + password);
            }
        }else {        
            res.status(200).send("invalid credentials" + email + password);
        }
    });
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.status(200).send({'login page' : 'Login page'});
});

router.post('/register', (req,res) => { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const {name, email, password} = req.body;

    User.findOne({email:email}).then((user)=>{
        if(user){
            res.status(200).send({'user' : email + ' is already taken.'});
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    const newUser = new User({name, email, password: hash});
                    newUser.save().then((user) => {
                        res.status(200).send("Created New user: " + user.email);
                    }).catch((err) => console.log(err.msg));
                })
            })
        }
    });

});

router.get('/test', (req,res) => { 
    res.json({
        'Hello' : 'test'
    });
    // console.log(msg);
    //const msg = "Hello Bryxki to!";
    //errors.push(req.flash('error'));
    // console.log('error: ' + req.flash('error'));
    // console.log('error_msg: ' + req.flash('error_msg'));
    //res.render('test');
    
});

app.use('/.netlify/functions/api',  router);
//app.use('/api',  router);

module.exports.handler = serverless(app);