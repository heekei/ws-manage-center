/* eslint-disable no-param-reassign */

/**
 * @description
 * @param {WebSocket} ws
 * @param {*} req
 */
function panelServerHandler(ws, req) {
  const pingTimer = setInterval(() => {
    if (ws.isAlive === false) { return ws.terminate(); }
    ws.isAlive = false;
    if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
      return ws.ping();
    }
    return clearInterval(pingTimer);
  }, 1000);
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  ws.on('message', (msg) => {
    /**
     * TODO:
     * 启动终端:
     *
     */
  });
}

module.exports = panelServerHandler;
