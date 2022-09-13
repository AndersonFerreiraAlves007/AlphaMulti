// Select elements
const input = document.querySelector('input');
const textArea = document.querySelector('textarea');
const connected = document.querySelector('.connected');

// WEBSOCKET CLIENT
const ws = new WebSocket('ws://localhost:8080');
// OPEN EVENT LISTENER
ws.addEventListener('open', ()=>{
    connected.textContent = 'Connected';
    connected.classList.add('active');
});
// MESSAGE EVENT LISTENER
ws.addEventListener('message', e =>{
    let {data} = e;
    let newData = JSON.parse(data);
    textArea.value =  textArea.value + `\n` + newData.time + newData.message;
});

// INPUT KEYPRESS EVENT LISTENER
input.addEventListener('keypress', e =>{
    if(e.code === 'Enter' && input.value !== ''){ 
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        let dateTime = ('⌚' + date + ' ' + time).toString();
        ws.send(JSON.stringify({time: dateTime, message: `💬 ${input.value}`}));
        input.value = '';
    };
});

// ON CLOSE EVENT LISTENER
ws.addEventListener('close', ()=>{
    connected.textContent = 'Disconnected.'
    connected.classList.remove('active');
});