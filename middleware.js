const express = require('express');
const app = express();
var externalMiddle = require('./external-middleware')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Creating Middleware for single route
var singleRouteMiddleware = (req,res,next) => {
    if (req.params.id == 200) 
        next();
    else
        console.log('Payment not done')    
}
// Using Middleware for single route
app.get('/payment/:id',singleRouteMiddleware,(req,res) => {
    res.send('Payment done')
})

// Using External Middleware
app.get('/external-middleware/:name',externalMiddle.externalMiddeware,(req,res) => {
    res.send('Name found');
})

// Global Middleware('All routes defined below this middleware will get applied this middleware by default)
var anyMiddleware = (req,res,next) => {
    console.log('Any middleware working')
    next();
}
app.use(anyMiddleware)
// Using Global Middleware
app.get('/secured-data',(req,res) => {
    res.send('Secured data accessed')
});
app.listen(3000,()=> console.log('Express js started to listening on 3000'))