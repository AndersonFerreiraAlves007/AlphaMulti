import express from 'express';
import WebSocket, {WebSocketServer} from 'ws';
const app = express();
const log = console.log;

// STATIC FOLDER
app.use(express.static('public'));

// WS SERVER
const wss = new WebSocketServer({port:8080});
// SERVER EVENTS
wss.on('connection', (ws, req)=>{
    let ip = req.socket.remoteAddress;
    log(`Ip ${ip}`);
    // ON CLIENT MESSAGE EVENT
    ws.on('message', data =>{
        log('received: %s', data.toString());

        // BROADCAST MESSAGE TO CONNECTED CLIENTS
        wss.clients.forEach(c =>{
            if(c !== ws && c.readyState === WebSocket.OPEN){
                c.send(data.toString());
                ws.send(data.toString());
            };
        });
    });
    
    // WELCOME MESSAGE
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let dateTime = ('⌚' + date + ' ' + time).toString();
    ws.send(JSON.stringify({time: dateTime, message:`💬 Bem-Vindos 🎉.`}));

});

// SERVER LISTENER
const PORT = 8000;
app.listen(PORT, log(`Server Listening on port ${PORT}`));