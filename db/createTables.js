var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_info (id Number, name Text, age Number, gender Text)");
  var stmt = db.prepare("INSERT INTO user_info VALUES (?,?,?,?)");
  for (var i = 0; i < 10; i++) {
      stmt.run(i,"Test User"+i,20+i,Math.random()>0.5?'M':'F');
  }
  stmt.finalize();

  db.each("SELECT * FROM user_info", function(err, row) {
      console.log(row);
  });
});

db.close();
