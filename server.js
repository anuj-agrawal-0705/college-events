const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient

 
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const myurl =
"mongodb+srv://anuj:<9621337879>@events-zmsld.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test') 
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  })
  


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
   
  });
  
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

  app.post('/uploadphoto', upload.single('picture'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
 var encode_image = img.toString('base64');
 // Define a JSONobject for the image attributes for saving to database
  
 var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
db.collection('quotes').insertOne(finalImg, (err, result) => {
    console.log(result)
 
    if (err) return console.log(err)
 
    console.log('saved to database')
    res.redirect('/')
   
     
  })
})


 