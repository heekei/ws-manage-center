const axios = require('axios');
const { spawnSync } = require('child_process');
// const webTerm = require()
function setCustomSSH(key, username, ipaddr, port) {
  return axios.default.post(`https://iterm.h-os.online/api/settings/save?key=${key}`,
    `{"general":{"font_size":11,"custom_command":"ssh ${username}@${ipaddr} -p ${port}","shell":"bash","boldAsBright":null},"colors":{"palette":["#2e3436","#cc0000","#4e9a06","#c4a000","#3465a4","#75507b","#06989a","#d3d7cf","#555753","#ef2929","#8ae234","#fce94f","#729fcf","#ad7fa8","#34e2e2","#eeeeec"],"foreground":"#f0f0f0","background":"#000000"}}`,
    {
      headers: {
        'content-type': 'application/json',
      },
    });
}

function startTermServer(key) {
  spawnSync(`echo -e "\n" | nohup sudo web-term -p 8090 --authentication-key ${key} -C /etc/letsencrypt/live/iterm.h-os.online/fullchain.pem -K /etc/letsencrypt/live/iterm.h-os.online/privkey.pem > null  2>&1 &`);
}

function stopTermServer() {
  spawnSync("ps -ef | grep web-term | grep -v grep | awk '{print $2}' | xargs kill -9");
}

module.exports = {
  setCustomSSH,
  startTermServer,
  stopTermServer,
};
