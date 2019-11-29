const express = require('express');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const app = express();
var externalMiddle = require('./external-middleware')
const { check, validationResult } = require('express-validator');
const { matchedData, sanitizeBody } = require('express-validator');
// For Posting data
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/upload-file',(req,res) => {
    res.render()
})
app.post('/upload-file', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})


// Validating Data
app.get('/form',(req,res) => {
    res.render('myform',{error: null});
})

app.post('/form',[
    check('email','Email is not valid').isEmail(),
    check('password','Password should be of 5 chars').isLength({min: 5})
],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('myform',{error: errors.mapped()})
    } else {
        const details = matchedData(req)
        res.render('index',{user: details})
    }
})

// Setting Templete engine
app.set('view engine','ejs')
app.set('views','./public/views')


// Fake path will show to client if they will check path of public files,which actullay doesnt exists in our server.
app.use('/fake_path',express.static('public'));

// app.get('/',(req,res) => {
//     res.sendFile(__dirname+'/index.html')
// });
app.get('/',(req,res) => {
    res.render('login');
})

app.post('/login',(req,res) => {
    res.render('index',{username: req.body.username, password: req.body.password});
})

//Option Params
app.get('/user/:id?',(req,res) => {
    if (req.params.id == undefined)
        res.send('User accessed')
    else
        res.send('User accessed with id '+req.params.id)
});

// From to To Params
app.get('/flight/:from?-:to?',(req,res) => {
    if(req.params.from == undefined || req.params.to == undefined)
        res.send('Searching flights')
    else
        res.send(`Searching for flights from ${req.params.from} to ${req.params.to}`)    
})

// Using External Middleware
app.get('/external-middleware/:name',externalMiddle.externalMiddeware,(req,res) => {
    res.send('Name found');
})

// Middleware for single route
var singleRouteMiddleware = (req,res,next) => {
    if (req.params.id == 200) 
        next();
    else
        console.log('Payment not done')    
}

app.get('/payment/:id',singleRouteMiddleware,(req,res) => {
    res.send('Payment done')
})
// Global Middleware('All routes defined below this middleware will get applied this middleware by default)
var anyMiddleware = (req,res,next) => {
    console.log('Any middleware working')
    next();
}
app.use(anyMiddleware)
//Middleware
app.get('/secured-data',(req,res) => {
    res.send('Secured data accessed')
});




app.listen(3000,()=> console.log('Express js started to listening on 3000'))