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
mongoose.connect('mongodb+srv://minigame:0949453611@cluster0.8uwj9.mongodb.net/minigame?retryWrites=true&w=majority',function(err){
    if(err){
        console.log("Mongo connect error !"+err);

    }else{
        console.log("Mongo connect successfully");
    }
});
// minigame 0949453611
require("./controllers/game")(app);