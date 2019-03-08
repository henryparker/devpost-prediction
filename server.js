const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")))

app.post('/prediction', async(req,res) => {

	console.log(req.body);

	let spawn = require("child_process").spawn; 
	let process = spawn('python' ,["./model/executeModel.py",
	req.body.Title,req.body.ShortPitch,req.body.Description,req.body.Tags]);
	console.log('process spawned');
	process.stdout.on('data', data => {
		console.log('sent');
		res.send({percent: data.toString()});
	})
	process.stderr.on('data', data => {
		console.log("ERROR: " + data);
	})
})

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

console.log("Server started on port " + port);

app.listen(port);