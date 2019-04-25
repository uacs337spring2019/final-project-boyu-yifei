/**  

CSC 337, Spring 2019
this is a battleship's service js file.
It's linked to battleship.html file. 

it will make sure the ranked data will update and uplode to dataspace

By: Boyu Li, Yifei Chen
*/

(function(){
'use strict';
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();	
app.use(express.static('public'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept");
	next();
	});
let mysql = require('mysql');
let con = mysql.createConnection({
host: "us-cdbr-iron-east-02.cleardb.net",
database: "heroku_5857b7e0a30e05f",
user: "b1eede5793f79f",
password: "80cbd621"
});

let user = "";
let time = 0;
app.post('/', jsonParser, function (req, res) {
	user = req.body.userName;
	time = req.body.time;
	con.query("insert into rank values ('" + user + "', "+ time +"); ",
		function (err, result, fields) {
		if (err) {throw err;}
		});
		
	});

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	con.connect(function(err) {
		let json = {"rank":[]};
		con.query("SELECT * FROM rank \n ORDER BY time",
		function (err, result, fields) {
		if (err) {throw err;}
			for(let i = 0; i < result.length; i++){
				json["rank"].push([[result[i]["user"]], [result[i]["time"]]]);
			}
			res.send(JSON.stringify(json));
		});
	

	});


});

app.listen(process.env.PORT);
	

}());