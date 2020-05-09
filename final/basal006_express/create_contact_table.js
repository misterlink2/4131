/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/


var mysql = require("mysql");
var fs = require("fs");
var xml2js = require("xml2js");

var parser = new xml2js.Parser();
var theinfo;
var host;
var db;
var pass;
var por;
var use;

var text = fs.readFileSync(__dirname + '/sample_dbconfig.xml','utf-8');
   parser.parseString(text,function (err, result) {
     if (err) throw err;
     
   host = result.dbconfig.host[0];
   db = result.dbconfig.database[0];
   pass = result.dbconfig.password[0];
   use = result.dbconfig.user[0];
   por = result.dbconfig.port[0];
   console.log("host:", host);

   });
var con = mysql.createConnection({
  host: host,  
  user: use, // replace with the database user provided to you
  password: pass, // replace with the database password provided to you
  database: db, // replace with the database user provided to you
  port: por
});
/*
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "cse-larry.cse.umn.edu",
  user: "C4131S20U7", // replace with the database user provided to you
  password: "79", // replace with the database password provided to you
  database: "C4131S20U7", // replace with the database user provided to you
  port: 3306
});
*/
con.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");
    var sql = `CREATE TABLE tbl_contacts(contact_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                         contact_name VARCHAR(30),
                                         contact_email VARCHAR(30),
                                         contact_address VARCHAR(80),
                                         contact_phone VARCHAR(30),
                                         contact_favoriteplace VARCHAR(30),
                                         contact_favoriteplaceurl VARCHAR(1024))`;
  con.query(sql, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Table created");
  });
});
