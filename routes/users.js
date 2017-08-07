var express = require('express');
var router = express.Router();
var firebase = require('firebase');

// firebase setup
firebase.initializeApp({
  //your database url goes here, grab it from https://console.firebase.google.com 
  databaseURL: "https://sany-node.firebaseio.com/",
  //your service account .json goes here, grab it from https://console.developers.google.com
	serviceAccount: "service_account_sany_node.json" 
});

var db = firebase.database();
var usersRef = db.ref("users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add-user',function(req,res){
  res.send('add new user');
});

// Firebase get all users
router.get('/get-all-user',function(req,res){
		usersRef.once("value", function(snapshot, prevChildKey) {
			res.json(snapshot.val());
		})
});

// Firebase get single user by id
router.get('/get-user/:uid',function(req,res){

  var uid = req.params.uid;
  if(uid.length!=0){
    usersRef.child(uid).once("value",function(snapshot){
      if(snapshot.val() != null){
       res.json(
         snapshot.val()
       );
      }else{
       res.json({message:"Error: No user find with that uid"});
      }
    });
  }else{
    res.json({message: "Error: uid must be be provided."});
  }

});

// Firebase update single user by id
router.put('/update-user/:uid',function(req,res){
  res.send('update single user');
});

// Firebase delete single user by id
router.delete('/delete-user/:uid',function(req,res){
  res.send('delete signgle user');
});

module.exports = router;
