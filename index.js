var express = require ('express');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');
var cors = require ('cors');
var path = require ('path');

var app = express();

const route = require('./employeelist/route');


mongoose.connect('mongodb://localhost:27017/employeelist', (err) => {
    if (!err)
     console.log('MongoDB connected suceesfully.....');
     else
     console.log('Error in connection:' + JSON.stringify(err, undefined, 2));
});


const port = 3000;



app.use(cors());

app.use(bodyparser.json());

app.use('/',route);



app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('server started at port:' + port)
})