const admin=require('firebase-admin');

var serviceAccount = require('./admin.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://itrfirebase.firebaseio.com",
    storageBucket: "gs://itrfirebase.appspot.com",
    authDomain: "itrfirebase.firebaseapp.com",
  });

var db=admin.database();
var userRef=db.ref("users");

const userOperation={
    addUser(obj,res){
        var oneUser=userRef.child(obj.roll);
        oneUser.update(obj,(err)=>{
            if(err){
                res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                res.status(200).json({"msg":"user created sucessfully"});
            }
        })
    },
    demoUser(obj,res){
        var userRefdemo=db.ref("demousers");
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.push(obj,(err)=>{
            if(err){
                res.status(300).json({"msg":"Something went wrong","error":err});
            }
            else{
                res.status(200).json({"msg":"user created sucessfully"});
            }
        })
    },
    getUsers(res){
        userRef.once('value',function(snap){
            res.status(200).json({"users":snap.val()});
        })
    },
    getOneUser(obj,res){
        var userRefdemo=db.ref("users");
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.once('value',function(snap){
            res.status(200).json({"user":snap.val()});
        })
    }
}

module.exports=userOperation;