const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let Port = 5000 || process.env.Port;

app.post('/prediction', async(req,res) => {
    console.log(req.body);
    res.send("it's on prediction --post");
})

app.get('/',async(req,res)=>{
    res.send("it's on");
})

app.listen(Port);

console.log("server started on port", Port);
