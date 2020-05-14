const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server)


// set static folder

app.use(express.static(path.join(__dirname, '_html_css')));


// run when client connects
io.on('connection', socket => {
    console.log('New Ws Connection...');
    // welcome current user
    socket.emit('message', 'Welcome to Chatcord');

    // broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined a chat');

    // runs when client disconnect
    socket.on('disconnect', () => {
        console.log('disconnect');
        io.emit('message', 'A user has left the chat')
    })

})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server Started on ', PORT));