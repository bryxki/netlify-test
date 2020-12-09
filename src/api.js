const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const bodyParser = require("body-parser");
//const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// app.use(cors({
//     origin: 'http://127.0.0.1:5500/dist/index.html',
//     exposedHeaders: ['Origin', 'X-Requested_With', 'Content-Type', 'Accept']
//   }));
  app.use(cors());
// var allowedOrigins = ['http://127.0.0.1:5500/dist/index.html', 'http://localhost:9000/api'];
// app.use(cors({
//     origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//     var msg = 'The CORS policy for this site does not ' +
//     'allow access from the specified Origin.';
//     return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//     }
// }));
// EJS
// app.use(expressLayouts); 
// app.set('view engine', 'ejs');
// //app.set('views', '../dist/views');
// app.set('views', path.join(__dirname, '../dist/views'));
//app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'dist')));
//app.engine('ejs', ejs.__express);

const router = express.Router();

router.get('/', (req,res) => {
    // res.json({
    //     'Hello' : 'World'
    // });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).send({'word' : 'Hello World'});
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

//app.use('/.netlify/functions/api',  router);
app.use('/api',  router);

module.exports.handler = serverless(app);