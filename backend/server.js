const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

const app = express();
const port = 4000;

app.use(cors());
app.options('*',cors());
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

app.get("/",(req,res) =>{
    res.json("Hello From JWT Example...")
});

//secret msg as JWT
let secret = 'some_secret123456';//a secret key is set here

//allow  paths with out token
app.use(expressJWT({secret:secret,algorithms:['HS256']})
    .unless({
        path:['/token/sign']
    }));

//create a token to be used
app.get('/token/sign',(req,res) =>{
    var userData = {
        "name" : "Swapna",
        "id" : "123456"
    }
    let token = jwt.sign(userData,secret,{expiresIn:'45s'})
    res.status(200).json({"token" : token});
});

app.get('/path1' ,(req,res) =>{
        res.status(200).json({
            "success" : true,
            "msg" : "Secret Access Granted"
        })
});

app.listen(port,function(){
    console.log("listening to "+port);
});