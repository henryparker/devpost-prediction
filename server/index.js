const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let Port = 5000 || process.env.Port;

app.post('/prediction', async(req,res) => {

    console.log(req.body);

    let spawn = require("child_process").spawn; 
    let process = spawn('python' ,["./executeModel.py",
    req.body.Title,req.body.ShortPitch,req.body.Description,req.body.Tags]);
	console.log('process spawned');
    process.stdout.on('data', data=>{
       res.send({percent:data.toString()});
    })
	res.send(Math.random());
})

app.get('/',async(req,res)=>{
    res.send("it's on");
})

app.listen(Port);

console.log("server started on port", Port);
