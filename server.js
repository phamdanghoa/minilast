var express = require("express");
var app = express ();

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
app.use("/scripts",express.static(__dirname+"/node_modules/web3.js-browser/build/"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT ||3000);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
//mongoose
const mongoose = require('mongoose');
const { debuglog } = require("util");
const { throws } = require("assert");
const { db } = require("./models/Hocvien");
const hocvienModel = require('./models/Hocvien');
mongoose.connect('mongodb+srv://minigame:0949453611@cluster0.8uwj9.mongodb.net/minigame?retryWrites=true&w=majority',function(err){
    if(err){
        console.log("Mongo connect error !"+err);

    }else{
        console.log("Mongo connect successfully");
    }
    //lấy dữ liệu người dùng 
    
 app.get('/list',async(req,res)=>{
     
const hocviens = await hocvienModel.find({});
try{
    let list ='<h3>Danh sach</h3><ol>';
    hocviens.forEach(item =>{
        list +=`<li>${item.HoTen}</li> `
    })
   list +='</ol>';
    res.send(list);
 
}catch(error){
    res.status(500).send(error);
} 
  
});  

});

// minigame 0949453611
require("./controllers/game")(app);