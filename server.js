const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const { GoogleToken } = require('gtoken');
const gtoken = new GoogleToken({
	keyFile: 'hackathon-predictor-256b76da24d9.json',
	scope: ['https://www.googleapis.com/auth/cloud-platform']
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")))

app.post('/prediction', async(req,res) => {
	let Total = req.body.Title
		+ ' ' + req.body.ShortPitch
		+ ' ' + req.body.Description
		+ ' ' + req.body.Tags.join();

	console.log('getting token');
	const token = await gtoken.getToken();

	let config = {
		headers: {
			Authorization: "Bearer " + token
		}
	}
	console.log('to model');
	axios.post('https://ml.googleapis.com/v1/projects/hackathon-predictor/models/hackWinChance/versions/hackWinChance_v2:predict', {instances:[Total]}, config)
	.then(result => {
		console.log('sent');
		res.send({percent: result.data.predictions[0][1]});
	})
	.catch(err => {
		console.log(err);
	})

	// console.log(req.body);

	// let spawn = require("child_process").spawn; 
	// let process = spawn('python' ,["./model/executeModel.py",
	// req.body.Title,req.body.ShortPitch,req.body.Description,req.body.Tags]);
	// console.log('process spawned');
	// process.stdout.on('data', data => {
	// 	console.log('sent');
	// 	res.send({percent: data.toString()});
	// })
	// process.stderr.on('data', data => {
	// 	console.log("ERROR: " + data);
	// })
})

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

console.log("Server started on port " + port);

app.listen(port);