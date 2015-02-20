//Load modules
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('./mydb.db');

//Perform SELECT Operation
db.all("SELECT * from user_info where gender='M'",function(err,rows){
//rows contain values while errors, well you can figure out.
	console.log(rows)
});

//Perform INSERT operation.
//db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

//Perform DELETE operation
//db.run("DELETE * from table_name where condition");

//Perform UPDATE operation
//db.run("UPDATE table_name where condition");
db.close();
