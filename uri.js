const express = require('express');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Optional Params
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
app.listen(3000,()=> console.log('Express js started to listening on 3000'))