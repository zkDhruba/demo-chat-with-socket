let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors({ origin: '*' }));

let http = require('http');
let expressServer = http.createServer(app);


let { Server } = require('socket.io');
// let io = new Server(expressServer);
const io = new Server(expressServer, {
    cors: {
        origin: '*',
    }
});

const port = 3000;

io.on('connection', (socket) => {
    console.log('New User Connected!');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
    socket.on('disconnect', ()=> {
        console.log('User has disconnected!');
    })
});

expressServer.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
