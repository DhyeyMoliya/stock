var express = require('express');
var bodyParser = require('body-parser');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB 
mongoose.connect('mongodb://localhost/test-db2', function (error) {
    if (error) {
        console.log(error);
    }
});

var db = mongoose.connection;
db.on('error', function callback(err) {console.log("Database connection failed. Error: " + err);});
db.once('open', function callback() {console.log("Database connection successful.");});


// Mongoose Schema definition
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   //username: String
   username: {type: String, unique: true}
});

var ChatSchema = new Schema({
  name: String,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
});

// Mongoose Model definition
var UserModel = mongoose.model('UserModel', UserSchema);
var ChatModel = mongoose.model('ChatModel', ChatSchema);

// Bootstrap express
var app = express();

//Add Json Support
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  //what is it good for?

// URLS management

/**Create new chat with its members.
 * 
 * Call the following from a Rest-Client (Like Firefox Plugin RESTClient):
  http://web-928bc441-24ff-4374-9998-f055ae761bb9.runnable.com/chats/create
  Header: Content-Type:application/json
  Body:
  {
  "userModelId": "552aa0a6e4b02e6693cd88bb",
  "chatModel": {"name": "myChat3", "members": ["552ac022e4b02e6693cd8900"]}
  }
*/
app.post('/chats/create', function (req, res) {
  console.log("body content: " + req.body);
  
  var userModelId = req.body.userModelId;
  var chatModelJson = req.body.chatModel;
  
  var chatModel = new ChatModel(chatModelJson);
  
  chatModel.save(function saveChat(error, savedChatModel) {
      if (error) {
        console.log("Error, ChatModel not saved");
        return;
      }
      console.log("Success: ChatModel saved");
      return res.json(savedChatModel);
  });
});

/**Create new User
 * Call the following from a Rest-Client (Like Firefox Plugin RESTClient):
  http://web-928bc441-24ff-4374-9998-f055ae761bb9.runnable.com/chats/create
  Header: Content-Type:application/json
  Body:
  {
    "username": "user3"
  }
 * */
app.post('/users/create', function (req, res) {
  console.log("in /users/create");
  var userModelJson = req.body;
  var userModel = new UserModel(userModelJson);

  userModel.save(function(error) {
    if(error) {
      console.log(error);
      return res.json({msg: "error"});
    }
    console.log("user created: " + userModel.username);
    res.json(userModel);
  });
});

//Simple get users
app.get('/', function (req, res) {
    res.send("<a href='/users'>Show Users</a><br><a href='/chats'>Show Chats</a>");
});

app.get('/users', function (req, res) {
  console.log("in users");
    UserModel.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/chats', function (req, res) {
  console.log("in chats");
    ChatModel.find({}, function (err, docs) {
        res.json(docs);
    });
});


// Start the server
var serverApp = app.listen(80, function () {
    console.log('Express server listening on port ' + serverApp.address().port);
});