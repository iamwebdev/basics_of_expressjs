const express = require('express');
const app = express();
// For Posting data
var bodyParser = require('body-parser')
var path = require('path')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Setting Templete engine
app.set('view engine','ejs')
app.set('views','./public/views')
app.use(express.static(__dirname+'./public/'));

var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })
  
//   var upload = multer({ storage: storage })
  
var upload = multer({ 
    storage: storage 
}).single('photo')


app.listen(3000,()=> console.log('Express js started to listening on 3000'))

// Shows Form
app.get('/upload-file',(req,res) => {
    res.render('upload-file')
});
// Upload File
app.post('/upload-file', upload, function (req, res, next) {
    res.render('upload-file')
});