// const express = require('express');
const Websocket = require('ws');

// const app = express();
// const expressWs = require('express-ws')(app);
const Config = require('../config');
const nodeServer = require('./core/nodesServer');
const panelServer = require('./core/panelServer');

// expressWs.applyTo(nodeServer);
// expressWs(app);
const wss = new Websocket.Server({
  port: Config.server.port,
});
wss.on('listening', () => {
  console.log(`正在监听 ${wss.address().address}:${wss.address().port}`);
});
wss.on('connection', (ws, req) => {
  ws.on('close', (code, reason) => {
    console.log(code, reason);
  });
  ws.on('error', (err) => {
    console.log(err);
  });
  if (req.url === '/nodes') nodeServer(ws, req);
  if (req.url === '/panel') panelServer(ws, req);
});
