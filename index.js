const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

//EAACN853dkEwBADrZAe3tYDgKUzamfEagCiQ7kIy5rlz5a6jkrAwMQQXJnG7ZBfTpLXrlMQKh2lvgIo05e4kEq2ANDGfFEZAZCKI2OO1FyOQTllZBZBGXXkz7So6omBCytNFLDgLbWpyLTSltNJHG0M5iqcHGCic6QYePXBkCGT8QZDZD
//heroku
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'verify_token') {
        res.send(req.query['hub.challenge'])
    }
    res.send('No sir')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
// app.set('port', (process.env.PORT || 5000))
// //handles jason how it needs to
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

// app.get('/', function(req, res){
// 	res.send('Hello');
// })

// app.get('/webhook/', function(req, rest){
// 	if(req.query['hub.verify_token'] ===
// 		'my_token'){
// 			res.send(req.query['hub.challenge'])
// 		}
// 	res.send('No entry')
// })

// app.listen(app.get('port'), function(){
// 	console.log('running on port', app.get('port'))
// })

// var express = require('express');
// var app = express();
// var FBBotFramework = require('fb-bot-framework');
// // Initialize
// var bot = new FBBotFramework({
// page_token: "EAACN853dkEwBADrZAe3tYDgKUzamfEagCiQ7kIy5rlz5a6jkrAwMQQXJnG7ZBfTpLXrlMQKh2lvgIo05e4kEq2ANDGfFEZAZCKI2OO1FyOQTllZBZBGXXkz7So6omBCytNFLDgLbWpyLTSltNJHG0M5iqcHGCic6QYePXBkCGT8QZDZD",
// //EAAc33DZALBBoBAGGCLYsexoqfRA4qZCVFmABTnTzTpbaSlmPQCkHMzJjaKaxbsZCuYEkHmfwHh3vhrAZCeUop093xuhq0BKlR1ZBgz3IZAEsr1JFo8gRIvnc1tYDvwtQBx7hJLj60YO9TvZAYTzA3BGipJ9OuBJzG7xC9z6bcUmNwZDZD
// verify_token: "verify_token"
// });
// // Setup Express middleware for /webhook
// app.use('/webhook', bot.middleware());
// // Setup listener for incoming messages
// bot.on('message', function(userId, message){
// bot.sendTextMessage(userId,   "Echo: " + message + "UserId: " + userId);
// });
// app.get("/", function (req, res){
// res.send("BayMax");
// });
// //Make Express listening
// app.listen(3000); 