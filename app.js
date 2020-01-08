const express=require('express');
const app=express();
var bodyParser=require('body-parser');
app.use(require('./utils/cors'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',require('./routes'));



app.listen(process.env.PORT || 5555,()=>{
    console.log("Server Started at port 5555 ");
});