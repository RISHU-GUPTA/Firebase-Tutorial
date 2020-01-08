# Firebase-Tutorial
Learn how to use firebase database and authenication in nodejs app

## Firebase Database
In this section you will learn how to store and retrieve data from firebase database.
### Prerequisites
1. Go to firebase console, create a project (or your existing project)
2. Navigate to, Project Setting-->Service accounts-->Firebase Admin SDK-->Choose Node.js-->Click on generate new private key

*This will download a json file required for firebase. Paste it in root directory and rename as admin.json* 

3. We will use npm module 'firebase-admin' for firebase database.
```
npm i firebase-admin --save
```
### Code
1. Now navigate to file where you will write database code (in my case it is database.js)
2. Require firebase-admin as admin
```
const admin=require('firebase-admin');
```
3. Initialize the app with a service account, granting admin privileges
*Use your project-id in place of it and use admin.json file which you downloaded*
```
var serviceAccount = require('./admin.json'); 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-id.firebaseio.com",
    authDomain: "project-id.firebaseapp.com",
  });
```
4. Get a database reference and create a node "users"
```
var db=admin.database();
var userRef=db.ref("users");
```
*This will create a node with "users"*

5. Now we make an object and inside it we write all the functions which will create or retreive data from firebase

    i) First function addUser() will create user with roll number with all details(obj) came in req.body(POST method)

    ii) For going or making a children of a parent node we use .child method

    iii) For creating a node we use **.update** method which simply update the database with the object provided. If node not exist it will create a new one.
```
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
    }
```
*This will create a node users and inside that a node with roll number and inside that all detail of user*

iv) Second function demoUser() will do same thing but with **.push** method. Each time it will create a user with unique key
```
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
    }
```

6. Retrive a data from database

    i) We will use **.once** method with **value** event.
```
getUsers(res){
        userRef.once('value',function(snap){
            res.status(200).json({"users":snap.val()});
        })
    }
```
*This will return all the users from "users" node*

ii) If we want only one field go to that node with **.child** method


```
 getOneUser(obj,res){
        var userRefdemo=db.ref("users");
        var oneUser=userRefdemo.child(obj.roll);
        oneUser.once('value',function(snap){
            res.status(200).json({"user":snap.val()});
        })
    }
```
*This will return a user with provided roll number only from "users"*
