var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {
  db.run("CREATE TABLE if not exists property (id Number, name Text, xtype Text)");
  db.each("SELECT * FROM property", function(err, row) {
      console.log(row);
  });  
});

db.close();
