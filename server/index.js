const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let Port = process.env.PORT || 5000;



app.post('/prediction', async(req,res) => {

    console.log(req.body);
    let config = {headers:{Authorization:"Bearer ya29.GlvGBhm4-o_IzPwIuqDWb_V7jHzs3zp8qLMCSvKd3-Ckiqb8JVyZifYGc3Z6Irn_6u1LBinntMfD5SZWrLax_YTN8Y8oU1IOF_gP4PhsaiBqOD8UzG01cf2t8zV_" }}
    // let spawn = require("child_process").spawn; 
    let Total = req.body.Title +' '+ req.body.ShortPitch + ' ' + 
    req.body.Description + ' ' + req.body.Tags.join()
    axios.post('https://ml.googleapis.com/v1/projects/hackathon-predictor/models/hackWinChance/versions/hackWinChance_v2:predict',
    {instances:[Total]}, 
    config).then(result=>{
        // console.log(result);
        res.send({percent:result.data.predictions[0][1]});
    }).catch(err=>console.log(err))
    // axios.post('https://webhook.site/19bc6020-d84d-4c70-8201-2e1bd5d31660',
    // {instances:[[Total]]}).then(result=>{
    //     console.log(result);
    //     // res.send(result.predictions[0][1]);
    // }).catch(err=>console.log(err))
    
    // let process = spawn('python3' ,["./executeModel.py",
    // req.body.Title,req.body.ShortPitch,req.body.Description,req.body.Tags]);

	// console.log('process spawned');
    // process.stdout.on('data', data => {
    //     console.log("hi");
    //    res.send({percent:data.toString()});
    // })
	// res.send(Math.random());
});


    // Exprees will serve up production assets
  
    // Express serve up index.html file if it doesn't recognize route
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});
  

// app.get('/',async(req,res)=>{
//     res.send("it's on");
// })

app.listen(Port);

console.log("server started on port", Port);
