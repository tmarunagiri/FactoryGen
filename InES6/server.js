var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Used for production build
app.use(express.static(__dirname));

app.post("/CreateFactory",function(req,res){
    //console.log("server route request received");
	var wf=require(path.join(__dirname, "src/server/WriteFactories"));
    wf.WriteToFile(req.body.jsonFactory);
    res.send("Success");
});
app.get("/CreateZip",function(req,res){
    foldername =path.join(__dirname,"src/server/Factory");
    var wf=require(path.join(__dirname, "src/server/WriteFactories"));
    wf.CreateZip(foldername,foldername+"/angularFactories.zip");
    res.send("Success");
});
app.get("/DelFolder",function(req,res){
    foldername =path.join(__dirname,"src/server/Factory");
    //console.log("Request received to delete "+ foldername);
    var wf=require(path.join(__dirname, "src/server/WriteFactories"));
    wf.DelFolder(foldername);
    res.send("Success");
});


app.all('/*', function(req, res) {
    console.log("default request received");
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});
