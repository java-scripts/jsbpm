server = require("./server")
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db/mydb.db');



var app = server.app;

app.get("/getAllUsers", function (req, res) {
    console.log('getting AllUsers');
	db.all('SELECT * FROM user_info', [], function (err, rows) {
        if (err !== null) {
                res.send({ ok: false, message: 'error while posting' });
                console.log('post error', err);
        } else {
                res.send(rows);
        }  
    });
});


app.post("/addUser",function(req,res){
	var data = req.body;
		try{
		var query = "INSERT into user_info(id,name,age,gender) VALUES ("+data.id+",'"+data.name+"',"+data.age+",'"+data.gender+"')";
			console.log(query);
			db.run(query);
			res.send({ ok: true, message: 'user added successfully' });
		}catch(e){
			console.log('error in adding user')
			res.send({ ok: false, message: 'error in adding user' });
		}

});
app.post("/deleteUser", function (req, res) {
	var data = req.body;
	try{
		console.log('deleting the user'+data.id);
		db.run("DELETE from user_info where id="+data.id);
		console.log('user deleted successfully.....');
		res.send({ ok: true, message: 'user deleted successfully' });		
	}catch(e){
		console.log('error while deleting user '+e)
		res.send({ ok: false, message: 'error while deleting user' });
	}
    
	
});

//----------------------------------------------------


app.get("/getAllProperties", function (req, res) {
    console.log('getting Properties');
	db.all('SELECT * FROM property', [], function (err, rows) {
        if (err !== null) {
                res.send({ ok: false, message: 'error while posting' });
                console.log('post error', err);
        } else {
                res.send(rows);
        }  
    });
});


app.post("/addProperty",function(req,res){
	var data = req.body;
	try{
		var query = "INSERT into property(id,name,xtype) VALUES ("+data.id+",'"+data.name+"','"+data.xtype+"')";
			console.log(query);
			db.run(query);
			res.send({ ok: true, message: 'property added successfully' });
		}catch(e){
			console.log('error in adding user')
			res.send({ ok: false, message: 'error in adding user' });
		}
});
app.post("/removeProperty", function (req, res) {
	var data = req.body;
	try{
		console.log('deleting the Property'+data.id);
		db.run("DELETE from property where id="+data.id);
		console.log('Property deleted successfully.....');
		res.send({ ok: true, message: 'Property deleted successfully' });		
	}catch(e){
		console.log('error while deleting Property '+e)
		res.send({ ok: false, message: 'error while deleting Property' });
	}	
});


