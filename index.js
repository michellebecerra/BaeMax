const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

//heroku
app.set('port', (process.env.PORT || 5000))
//handles jason how it needs to
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.send('Hello');
})

app.get('/webhook/', function(req, rest){
	if(req.query['hub.verify_token'] ===
		'my_token'){
			res.send(req.query['hub.challenge'])
		}
	res.send('No entry')
})

app.listen(app.get('port', function(){
	console.log('running on port', app.get('port'))
})