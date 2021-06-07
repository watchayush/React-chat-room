const express = require('express');
const socketio= require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./Users.js');

const cors= require('cors');

const PORT=process.env.PORT || 5000;

const router=require('./router');

const app = express();
const server=http.createServer(app);
// const io=socketio(server);
const io=socketio(server, {
    cors: {
      origin: '*',
    }
  });
app.use(router);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

io.on('connection',(socket)=>{
    console.log('We have a new connection');

    socket.on('join',({name,room},callback)=>{
        console.log("111",name,room);
        const {error,user}=addUser({id:socket.id,name,room});
        console.log(user," this is user");
        if(error) callback(error);

        socket.emit('message',{user:'admin',text:`${user.name} welcome to ${user.room}`},);

        socket.broadcast.to(user.room).emit('message',`${user.name} has joined the chat`);
        socket.join(user.room);

        io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)});

        callback();
    });

    socket.on('sendMessage',(message,callback)=>{
      const user = getUser(socket.id);
      
      io.to(user.room).emit('message',{user:user.name,text:message});
      io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});

      callback();
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        console.log("removed user ",user)
        if(user){
          io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left the chat`});
        }
    })
})

app.use(router);

server.listen(PORT,()=>{
    console.log(`server has started at port ${PORT}`);
});