const express = require('express');
const path = require('path');
const app = express();
var port = process.env.PORT || 8080;

var outputObj = {}; 

function isUrl(str){
    var sampleUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gi;
    if (str.match(sampleUrl)){
        return true;
    } else {
        return false;
    }
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:query', function (req, res){
    
    var query = req.params.query;
    if (query == outputObj.short_url){
        res.redirect('http://' + outputObj.original_url);
    }
});


app.get('/new/:query', function (req, res){
   
   var query = req.params.query;
   var rndID = Math.floor(1000 + Math.random() * 9000);
   if(isUrl(query)){
       delete outputObj.error;
       outputObj.short_url = rndID;
       outputObj.original_url = query;
   } else {
       delete outputObj.short_url;
       delete outputObj.original_url;
       outputObj.error = 'incorrect URL';
   }
   res.send(outputObj);
});

app.listen(port, function(){
    console.log('Url-shortener is listening on port: ' + port);
});