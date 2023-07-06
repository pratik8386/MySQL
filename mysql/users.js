var express = require('express')
var myconnection = require('./myconnection')
var app = express();
var bodyParser = require('body-parser');

app.use(express.urlencoded({ 'extended': true }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
app.use(bodyParser.json());

//localhost:5000/register
//input : email,mobile,password
app.post("/register",function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    var mobile = request.body.mobile;
    var sql = `insert into users (email,password,mobile) values('${email}','${password}','${mobile}')`;
    myconnection.con.query(sql,function(error,result){
        if(error)
            response.send('error occured');
        else 
        {
            response.send(`Account created with id ${result.insertId}`)
        }
    })
});

app.listen(5000);
console.log('ready to accept request');