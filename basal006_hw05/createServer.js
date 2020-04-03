const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if(req.url === '/'){
    indexPage(req,res);
  }
  else if(req.url === '/index.html'){
    indexPage(req,res);
  }
  else if(req.url === '/contact.html'){
    contactPage(req,res);
  }
  else if(req.url === '/table'){
    contactJSON(req,res);
  }
  else if(req.url === '/addContact.html'){
    addContactPage(req,res);
  }
  else if(req.url === '/postContactEntry'){
    postContact(req,res);
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("404 Not Found");
  }
}).listen(9001);


function contactJSON(req, res) {

  fs.readFile('contact.json', function(err, data) {
    if(err) {
      throw err;
    }
    var jsonParsed = JSON.parse(data)
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    console.log(jsonParsed)
    res.write(data);
    res.end();
  });
}

function postContact(req, res) {
   var post;
   var msg;
   if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            post = qs.parse(body);
            // use post['blah'], etc.
	    
	    console.log("THE BODY: ", post)
   //     });
            fs.readFile('./contact.json',(err,file) => {
              //  if(err) {throw err};    
            let json = JSON.parse(file);
            json.contact.push(post)
	    console.log("CONTACT",json.contact)
	    //console.log("CONTACT2",json.contact)
	    fs.writeFile('contact.json', JSON.stringify(json));/*;,function (err, data){
	        if (err) {throw err};})
           */ })

        });
    //res.write(msg.toString());
        res.writeHead(301, {Location: '/contact.html'});
        res.end();
        }
}

function addContactPage(req, res) {
  fs.readFile('client/addContact.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}
function contactPage(req, res) {
  fs.readFile('client/contact.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function indexPage(req, res) {
  fs.readFile('client/index.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}
