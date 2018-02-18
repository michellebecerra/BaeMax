const express = require('express');
//const bodyParser = require('body-parser')
//const request = require('request')
const app = express();

//EAACN853dkEwBADrZAe3tYDgKUzamfEagCiQ7kIy5rlz5a6jkrAwMQQXJnG7ZBfTpLXrlMQKh2lvgIo05e4kEq2ANDGfFEZAZCKI2OO1FyOQTllZBZBGXXkz7So6omBCytNFLDgLbWpyLTSltNJHG0M5iqcHGCic6QYePXBkCGT8QZDZD
//heroku https://mysterious-brushlands-59124.herokuapp.com/

app.set('port', (process.env.PORT || 5000));

// // Process application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: false}))

// // Process application/json
// app.use(bodyParser.json())

// // Index route
// app.get('/', function (req, res) {
//     res.send('Hello world')
// })

// // for Facebook verification
// app.get('/webhook/', function (req, res) {
//     if (req.query['hub.verify_token'] === 'verify_token') {
//         res.send(req.query['hub.challenge'])
//     }
//     res.send('No sir')
// })
// app.post('/webhook/', function(req,res){
// 	res.send(req.body.entry[0].messaging)
// })

var FBBotFramework = require('fb-bot-framework');
var lib = require('lib');
var times = 0;

var quesMap = new Map();
quesMap.set(1, "Are you having headaches? If so, why do you think so?");
quesMap.set(2, "Are you having trouble with sleeping? If so, why do you think so?");
quesMap.set(3, "Are you experiencing aching muscles? If so, why do you think so?");
quesMap.set(4, "Do you feel that you are having a lack of focus? If so, why do you think so?");
quesMap.set(5, "Are you experiencing panic or fear? If so, why do you think so?");
quesMap.set(6, "Are you having headaches? If so, why do you think so?");
quesMap.set(7, "Are you experiencing chest pain? If so, why do you think so?");
quesMap.set(8, "Are you experiencing a loss of appetite? If so, why do you think so?");
quesMap.set(9, "Have you been experiencing forgetfulness? If so, why do you think so?");
quesMap.set(10, "Have you been having careless mistakes? If so, why do you think so?");
quesMap.set(11, "Have you experienced a death? If so, please elaborate.");
quesMap.set(12, "Have you experienced trauma? If so, please elaborate.");
quesMap.set(13, "Do you feel like you have too much energy? If so, why do you think so?");
quesMap.set(14, "Do you feel like you talk very fast? If so, why do you think so?");
quesMap.set(15, "Do you have issues with your body image? If so, why do you think so?");
quesMap.set(16, "Do you overeat frequently? If so, why do you think so?");

var neg = new Map();
neg.set(1, "I can see how that can be bothersome.");
neg.set(2, "I hear ya.");
neg.set(3, "I'm sorry to hear that.");
neg.set(4, "I'm listening.");
neg.set(5, "Hang in there.");
neg.set(6, "I can see why that's frustrating.");
neg.set(7, "I understand.");
neg.set(8, "Tell me more.");
neg.set(9, "I can see how that can be frustrating.");
neg.set(10, "I can see how that can be annoying.");
neg.set(11, "I am really sorry you are going through this.");
neg.set(12, "This is a lot for someone to go through.");
neg.set(13, "I hear ya. Let's figure this out together.");
neg.set(14, "Okay tell me one more thing.");
neg.set(15, "I understand. Let me see what you could have.");

var pos = new Map();
pos.set(1,"Great.");
pos.set(2,"Okay.");
pos.set(3,"Good.");
pos.set(4,"How about this one?");
pos.set(5,"Awesome.");
pos.set(6,"I see.");
pos.set(7,"I'm listening.");
pos.set(8,"That's great.");
pos.set(9,"Good to hear.");
pos.set(10,"Wonderful.");
pos.set(11,"Yay.");
pos.set(12,"Woohoo.");
pos.set(13,"Marvelous.");
pos.set(14,"Cool!");
pos.set(15,"Great.");



// Initialize
var bot = new FBBotFramework({
page_token: "EAAIhsVUTJo4BAKF934xQwqGqO7y5dSlmiUZBIy7wQuirNdjuLYGAFXTFVcS3vl1MZCDL89P8NWvoZBTzxEz4SlgVwWHa7LI9qXG9yK3nDjbhHqZCAMzKZBKDsI5KplwpgrTzZB3jVP2tbyrGVIdPCiapzJZCKJZBub1ZCR4Xj66ZAgZCAZDZD",
//EAAc33DZALBBoBAGGCLYsexoqfRA4qZCVFmABTnTzTpbaSlmPQCkHMzJjaKaxbsZCuYEkHmfwHh3vhrAZCeUop093xuhq0BKlR1ZBgz3IZAEsr1JFo8gRIvnc1tYDvwtQBx7hJLj60YO9TvZAYTzA3BGipJ9OuBJzG7xC9z6bcUmNwZDZD
verify_token: "verify_token"
});
// Setup Express middleware for /webhook
app.use('/webhook/', bot.middleware());
// Setup listener for incoming messages
bot.on('message', function(userId, message){
	//bot.sendTextMessage(userId,   "Echo: " + message + "UserId: " + userId);
	times = times + 1;
	//bot.on('message', function(userId, message){
	if(message.includes("Hello") || message.includes("Hi")){
		bot.sendTextMessage(userId, "Hello there! This is BaeMax. Thank you for visiting me today, tell me a little bit about why you're here. Let's figure this out together!");
		times = 0
	}else{
		var jSON = {"UserKey": userId, "message": message};
		handleRequest(times, jSON, function(err, mess){
		if(times < 4){
			
			console.log(mess);
			bot.sendTextMessage(userId, mess);
		}else{
			//results handling
			res = mess.split("zebra");
			var imageUrl = res[0];
			var text = res[1];
			bot.sendImageMessage(userId, imageUrl);
			bot.sendTextMessage(userId, text);
			if(times >= 4){
				times = 0
			}
		}		
	});		
	}



});

app.get('/', function (req, res){
	res.send('BaeMax');
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});

function handleRequest(time, json, callback){

	lib.gnahum12345.baeMax['@dev']({
		jFile: JSON.stringify(json)
	}, (err, results) => {
		if (err) {
			return callback(err);
		}
		//console.log(results)
		if(results != "negative" && results != "positive"){
			return callback(null, results);
		}
		var mess = "";
		if(results == "negative"){
			mess = neg.get(time);
		}else{
			mess = pos.get(time);
		}
		mess += quesMap.get(time);

		return callback(null, mess);
	});

}
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