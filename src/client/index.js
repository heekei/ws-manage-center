const WebSocket = require('ws');
// const os = require('os');

// const nets = os.networkInterfaces();
// Object.entries(nets).forEach((i) => {
//   console.log(i[0]);
//   console.log(i[1]);
// });
function msg(data) {
  return JSON.stringify(data);
}


const client = new WebSocket('ws://127.0.0.1:9461/nodes', {
  headers: {
    'node-ip': 1,
    'node-port': 22,
  },
});
// client.on('close', (code, reason) => {
//   console.log(code, reason);
// });
client.onclose = ({ code, reason, target }) => {
  // console.log(code, reason, target);
};
client.onmessage = ({ data, type, target }) => {
  // event;
  console.log(data);
  // console.log(`message: ${data}`);
};
client.onopen = ({ target }) => {
  console.log('连接上了');
  client.send(msg(['asdf']));
};
