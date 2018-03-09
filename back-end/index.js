const express = require("express");
const path = require("path");

var MongoClient = require("mongodb").MongoClient
const assert = require("assert");
const fetch= require("node-fetch");
/*
*/
const dbName=process.env.DB_NAME;
const DB_URI=process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

// Create the db connection
MongoClient.connect(DB_URI, function(err, database) 
{  
    assert.equal(null, err);
    mongodb=database.db(dbName).collection("figths");
    topdb=database.db(dbName).collection("top");
    //console.log(mongodb.find());
    console.log("Mongo está corriendo");
	app.listen(port);
	console.log(" listening on " +port);
    }
);

app.get("/api/registrar/:winner/:loser",(req,res)=>{
	insert(mongodb, req.params.winner, req.params.loser, ()=>res.send("ok"));
});

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

								count:count, 
								username:username,
								fullName:fullName, 
								profilePic:likes.user.profile_pic_url,
								profile:"https://www.instagram.com/"+username
							};
							res.json(user)
						}).catch((err)=>res.send("No Existe o es privado "+req.params.user))
		
});

function findA(callback)
{
	mongodb.find().toArray((err,docs)=>{
	assert.equal(null,err);
		callback(docs);	
	});
}


app.get("/api/find", (req, res) => 
{
 	findA((docs)=>{
		res.send(docs);
	});
});

function find(callback)
{
	topdb.find().sort( { count: -1 } ).limit(10).toArray((err,docs)=>{
	assert.equal(null,err);
		callback(docs);	
	});
}

app.get("/api/findTopUsers", (req, res) => 
{
 	find((docs)=>{
		res.send(docs);
	});
});
/*
function getTopTen(callback)
{
	findDocuments(mongodb,callback);
}
*/

const getCount=function(user,callback)
{
	topdb.find({user:user}).toArray(function(err,docs)
	{

		assert.equal(null,err);
		callback(docs);
	});
};


app.get("/api/top/:user", (req, res) => {
	getCount(req.params.user,(docs)=>{

		if(docs.length===0)
		{

			/*
			No existe
			*/
			insertSingle(req.params.user,()=>
			{
			res.send("ok");	
		 	});
		}
		else
		{
			console.log(docs);
			pistas = docs[0].count;
			pistas++;

			console.log("ahora hay "+pistas);
			if(pistas<=4)
			update(req.params.user,pistas,()=>
			{
			res.send("ok");	
		 	});
			
		}
	});	
});

const update = function(user,pistas, callback)
{	
	var myquery = { user: user };
  	var newvalues = { $set: {count: pistas } };
  	topdb.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    callback(pistas);
  });
}

const insertSingle=function( winner, callback)
{
	var date =new Date();
	var scoreObj=
	{
		user:winner, 
		count:1};
	topdb.insertOne(scoreObj, (err, res)=>
	{
		if (err) throw err;
	    console.log("1 user updated");
		callback("Done!");
	});
};

const insert=function(db, winner, loser, callback)
{
	var date =new Date();
	var scoreObj=
	{
		date:date.toString(),
		winner:winner, 
		loser:loser};
	db.insertOne(scoreObj, (err, res)=>
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

