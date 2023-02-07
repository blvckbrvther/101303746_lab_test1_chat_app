const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/101303746_lab_test1_chat_app', { useNewUrlParser: true });

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log('Chat server listening on port 3000');
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdon: {
      type: Date,
      default: Date.now
    }
  });
  const User = mongoose.model('User', userSchema);
  
  const groupMessageSchema = new mongoose.Schema({
    from_user: {
      type: String,
      required: true
    },
    room: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    date_sent: {
      type: Date,
      default: Date.now
    }
  });
  const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);
  
  const privateMessageSchema = new mongoose.Schema({
    from_user: {
      type: String,
      required: true
    },
    to_user: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    date_sent: {
      type: Date,
      default: Date.now
    }
  });
  const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);