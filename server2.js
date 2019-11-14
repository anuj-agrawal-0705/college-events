const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const fs = require('fs')
const multer = require('multer')
const Photo = require('./Photo');
const Data = require('./data')

const path = require('path')



const API_PORT = 3001;

const app = express();

app.use(cors());
const router = express.Router();

const dbRoute =
"mongodb+srv://anuj_agrawal:<9621337879>@events-zmsld.mongodb.net/test?retryWrites=true&w=majority"
 
mongoose.connect(dbRoute, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true
},()=> console.log("connected to db"))

let db = mongoose.connection

// db.once('open', () => console.log('connected to the database'))
// db.on('error', console.error.bind(console,'MongoDB connection error:'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))

var storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+
      path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage 
  }).single("myImage")



   app.get('/', (req,res)=>{
        res.sendFile(__dirname + '/index.html')
   })

   app.post('/upload/photo',(req,res)=>{
    let Datas = new Data()
    Datas.img.data = fs.readFileSync(req.file.filename)
    Datas.img.contentType = 'image/png';
    Datas.save((err)=>{
        if (err) return res.json({success: false,error:err})
        return res.json({success: true})
    });
   });

  // app.post('/upload/photo',(req,res) => {
  //   upload(req, res,(error) => {
  //     if(error){
  //        res.redirect('/?msg=3');
  //     }else{
  //       if(req.file == undefined){
          
  //         res.redirect('/?msg=2');
  //       }else{
             
  //           /**
  //            * Create new record in mongoDB
  //            */
  //           var fullPath = "files/"+req.file.filename;
  //           var document = {
  //             path:     fullPath, 
  //             caption:   req.body.caption
  //           };
  
  //         var photo = new Photo(document); 
  //         photo.save(function(error){
  //           if(error){ 
  //             throw error;
  //           } 
  //           res.redirect('/?msg=1');
  //        });
  //     }
  //   }
  // });
  // })



   app.use('/api', router);

   app.listen(API_PORT, () =>
    console.log(`LISTENING ON PORT ${API_PORT}`));
