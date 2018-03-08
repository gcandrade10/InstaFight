const express = require("express");
const path = require("path");

var MongoClient = require("mongodb").MongoClient
const assert = require("assert");
const fetch= require("node-fetch");
/*
const dbName=process.env.DB_NAME;
const DB_URI=process.env.MONGODB_URI;
*/
const port = process.env.PORT || 5000;

const dbName="prueba"
const DB_URI="mongodb://localhost:27017/"+dbName;


const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

// Create the db connection
MongoClient.connect(DB_URI, function(err, database) 
{  
    assert.equal(null, err);
    mongodb=database.db(dbName).collection("prueba");
    //console.log(mongodb.find());
    console.log("Mongo está corriendo");
	app.listen(port);
	console.log(" listening on " +port);
    }
); 

app.get("/api/user/:user",(req,res)=>
{
	console.log("Consultando "+req.params.user);
	fetch("https://www.instagram.com/"+req.params.user+"/?__a=1")
			        	.then((rta)=>{
						return rta.json();
						})
						.then((likes)=>{
							var arr = likes.user.media.nodes;
							var count=0;
							for (var i = arr.length - 1; i >= 0; i--) 
							{
								count+=arr[i].likes.count;
							}
							var username =likes.user.username; 
							var fullName =likes.user.full_name;
							var user={

								count:count, username:username,
								fullName:fullName, 
								profilePic:likes.user.profile_pic_url
							};
							res.json(user)
						})
		
});

function find(callback)
{
	mongodb.find().toArray((err,docs)=>{
	assert.equal(null,err);
		callback(docs);	
	});
}

app.get("/api/find", (req, res) => 
{
 	find((docs)=>{
		res.send(docs);
	});
});


function getTopTen(callback)
{
	findDocuments(mongodb,callback);
}


const findDocuments=function(db,callback)
{
	mongodb.find().sort( { score: -1 } ).limit(10).toArray(function(err,docs)
	{

		assert.equal(null,err);
		callback(docs);
	});
};


const insert=function(db, user, score, callback)
{
	var scoreObj={user:user, score:parseInt(score,10)};
	mongodb.insertOne(scoreObj, (err, res)=>
	{
		if (err) throw err;
	    console.log("1 document inserted");
		callback("Done!");
	});
};


function saveScore(user, score, callback)
{
		insert(mongodb, user, score, callback);
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under "/api"
app.get("/api/gettop", (req, res) => 
{
 	getTopTen((top)=>{
		res.send(top);
	});
});

app.post("/api/savescore", (req, res) => 
{
	//console.log(req);
 	saveScore(req.body.user, req.body.score,(msj)=>{
		res.redirect("/#/top");
	});
});

// The "catchall" handler: for any request that doesn"t
// match one above, send back React"s index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build/index.html"));
});

