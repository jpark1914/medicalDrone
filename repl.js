var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var PaVEParser = require('ar-drone/lib/video/PaVEParser.js');
var output = require('fs').createWriteStream('./vid.h264');
var video = client.getVideoStream();

var parser = new PaVEParser();




// Commands for the drone






client.takeoff();

client
    .after(5000, function () {
    parser
        .on('data', function(data) {
            output.write(data.payload);
        })
        .on('end', function() {
            output.end();
        });
    video.pipe(parser);
})
    .after(2000, function (){
        this.front();
    })
    .after(2000, function () {
        this.clockwise(0.5);
    })
    .after(2000, function(){
        this.front();
    })
    .after(5000, function(){
        this.stop();
        this.land();
    });
