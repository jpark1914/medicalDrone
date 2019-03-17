var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var app = express();

//=====================
//==Drone Library======
//=====================

var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var PaVEParser = require('ar-drone/lib/video/PaVEParser.js');
//var output = require('fs').createWriteStream('./vid.h264');
var video = client.getVideoStream();

var parser = new PaVEParser();



// function onRequest(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('You have the the right URL');
//     // res.sendFile('../client/med.html');
//     res.end();
// }

// http.createServer(onRequest).listen(3000);

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.get('/med', function(req, res) {
    res.sendFile(path.resolve('../client/med.html'))
    });
app.get('/activate', (req, res)=> {
    console.log("Got a request!");
    client.takeoff();

    client
        // .after(5000, function () {
        //     parser
        //         .on('data', function(data) {
        //             output.write(data.payload);
        //         })
        //         .on('end', function() {
        //             output.end();
        //         });
        //     video.pipe(parser);
        // })
        .after(5000, function (){
            this.front(0.1);
        })
        .after(5000, function () {
            this.clockwise(0.5);
        })
        .after(5000, function(){
            this.front(0.1);
        })
        .after(5000, function(){
            this.stop();
            this.land();
        });

  res.send('All good');
})
    var port = process.env.PORT || 3000;
    var server = app.listen(port);
    console.log('Express app started on port ' + port);