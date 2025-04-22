var express=require("express")
var app=express();
var path=require('./Dbconnection')

var cors=require("cors")
app.use(cors())

var parser=require("body-parser")
app.use(parser.json())

var route=require('./routes')
app.use("/",route)

app.use('/upload', express.static('upload'));




app.listen(8000,()=>{
    console.log("Hellooo express......");
});