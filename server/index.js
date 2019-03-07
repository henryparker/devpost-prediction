const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let Port = 3000 || process.env.Port;

app.post('/prediction', async(req,res) => {

    console.log(req.body);

    let spawn = require("child_process").spawn; 
<<<<<<< HEAD
    let process = spawn('python3' ,["./executeModel.py",
=======
    let process = spawn('python',["./executeModel.py",
>>>>>>> 9871095ec650bf421f086093ac7190844b89e0bb
    req.body.Title,req.body.ShortPitch,req.body.Description,req.body.Tags]);
	console.log('process spawned');
    process.stdout.on('data', data=>{
        res.send(data);
    })

})

app.get('/',async(req,res)=>{
    res.send("it's on");
})

app.listen(Port);

console.log("server started on port", Port);
