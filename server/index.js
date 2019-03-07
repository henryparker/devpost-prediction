const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let Port = process.env.PORT || 5000;



app.post('/prediction', async(req,res) => {

    console.log(req.body);

    let spawn = require("child_process").spawn; 
    let process = spawn('python3' ,["./executeModel.py",
    req.body.Title,req.body.ShortPitch,req.body.Description,req.body.Tags]);
	console.log('process spawned');
    process.stdout.on('data', data => {
    // console.log(data);
       res.send({percent:data.toString()});
    })
	// res.send(Math.random());
})

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
  }

// app.get('/',async(req,res)=>{
//     res.send("it's on");
// })

app.listen(Port);

console.log("server started on port", Port);
