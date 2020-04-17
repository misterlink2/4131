// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express module
var express = require("express");

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// native js function for hashing messages with the SHA-256 algorithm
var crypto = require('crypto');

// include the mysql module
var mysql = require("mysql");


var con = mysql.createConnection({
  host: "cse-larry.cse.umn.edu",
  user: "C4131S20U7", // replace with the database user provided to you
  password: "79", // replace with the database password provided to you
  database: "C4131S20U7", // replace with the database user provided to you
  port: 3306
});

con.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");
});
// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment
/*
app.use(session({
  secret: "csci4131secretkey",
  saveUninitialized: true,
  resave: false}
));
*/
// server listens on port 9007 for incoming connections
app.listen(9007, () => console.log('Listening on port 9007!'));

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/welcome.html');
});

app.get('/welcome',function(req, res) {
	res.sendFile(__dirname + '/client/welcome.html');
});

app.get('/table',function(req,res) {
	res.sendFile(__dirname + '/contact.json');
});

app.get('/addContactPage',function(req,res) {
  //Add Details
	res.sendFile(__dirname + '/client/addContact.html');
});
// // GET method route for the contact page.
// It serves contact.html present in client folder
app.get('/contact',function(req, res) {
  //Add Details
	res.sendFile(__dirname + '/client/contact.html');
//con.connect(function(err) {
  //if (err) throw err;
  //Select all customers and return the result object:

 // con.query("SELECT * FROM tbl_contacts", function (err, result, fields) {
   // if (err) throw err;
    //console.log(result);
   // res.send(result);
 // });


});


// GET method route for the addContact page.
// It serves addContact.html present in client folder
app.get('/addContact',function(req, res) {
  //Add Details
  res.sendFile(__dirname + '/client/addContact.html');
});
//GET method for stock page
app.get('/stock', function (req, res) {
        //console.log(req.session.value);
	res.sendFile(__dirname + '/client/stock.html');
});

// GET method route for the login page.
// It serves login.html present in client folder
app.get('/login',function(req, res) {
  //Add Details
	res.sendFile(__dirname + '/client/login2.html');
});

// GET method to return the list of contacts
// The function queries the tbl_contacts table for the list of contacts and sends the response back to client
app.get('/getListOfContacts', function(req, res) {
  //Add Details
});

// POST method to insert details of a new contact to tbl_contacts table
app.post('/postContact', function(req, res) {
  //Add Details
  
 var name =req.body.name;
 var email =req.body.email;
 var address =req.body.address;
 var phone =req.body.phoneNumber;
 var place =req.body.favoritePlace;
 var url =req.body.favoritePlaceURL;

  var sql = "INSERT INTO `tbl_contacts` (`contact_name`, `contact_email`,`contact_address`,`contact_phone`,`contact_favoriteplace`,`contact_favoriteplaceurl`) VALUES ('" + name + "', '" + email + "','" + address + "','" + phone + "','" + place + "','" + url + "')";
  con.query(sql, function (err, result) {
  if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });



  con.query('select * from `tbl_contacts`', function(err, results, fields) {
    if(err) throw err;

    fs.writeFile('contact.json', JSON.stringify(results), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

});

    res.redirect('/contact');
});

// POST method to validate user login
// upon successful login, user session is created
app.post('/sendLoginDetails', function(req, res) {
  console.log("name: ",req.body.name);
  console.log("password: ",req.body.password);
  passwordValidate(req,res); 
  //Add Details
});

// log out of the application
// destroy user session
app.get('/logout', function(req, res) {
  //Add Details
});

// middle ware to serve static files
app.use('/client', express.static(__dirname + '/client'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
  // add details
   res.send("404 page not found");
});


function passwordValidate(req,res){

    var username = req.body.name;
    var pass = req.body.password;
    var password = crypto.createHash('sha256').update(pass).digest('base64');
    console.log("username:");
    console.log(username);
    console.log("password:");
    console.log(password);

    if (username && password) {
        con.query('SELECT * FROM tbl_accounts WHERE acc_login = ? AND acc_password = ?', [username, password], function(error, results, fields) {
            console.log(username);
            if (results.length > 0) {
                //req.session.value =1;
                //res.send('Correct log in!');
               res.redirect('/contact');
            } else {
                res.send('Incorrect Username and/or Password!');
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
};
