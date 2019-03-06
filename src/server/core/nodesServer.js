/* eslint-disable no-param-reassign */
const Websocket = require('ws');
const http = require('http');

// const nodes = [];
global.nodesSet = new Set();
/**
 * @description
 * @param {WebSocket} ws
 * @param {http.IncomingMessage} req
 */
function nodeServerHandler(ws, req) {
  global.nodesSet.add(ws);
  console.log(req.headers.heekei);

  const pingTimer = setInterval(() => {
    if (ws.isAlive === false) { return ws.terminate(); }
    ws.isAlive = false;
    if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
      return ws.ping();
    }
    global.nodesSet.delete(ws);
    return clearInterval(pingTimer);
  }, 1000);
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    console.log('nodesServer: ', msg);
  });
}
setInterval(() => {
  console.log(global.nodesSet);
}, 1000);

module.exports = nodeServerHandler;
