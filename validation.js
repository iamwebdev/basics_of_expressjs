const express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');
const { matchedData, sanitizeBody } = require('express-validator');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Shows Form
app.get('/form',(req,res) => {
    res.render('myform',{error: null});
})

// Validating Data
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

app.listen(3000,()=> console.log('Express js started to listening on 3000'))