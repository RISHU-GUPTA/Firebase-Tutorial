const route=require('express').Router();
const userOperation=require('./database');

route.post('/addUser',(req,res)=>{
    userOperation.addUser(req.body,res);
})

route.post('/demoUser',(req,res)=>{
    userOperation.demoUser(req.body,res);
})

route.get('/getUsers',(req,res)=>{
    userOperation.getUsers(res);
})

route.post('/getOneUser',(req,res)=>{
    userOperation.getOneUser(req.body,res);
})
module.exports=route;