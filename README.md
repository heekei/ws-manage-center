# ws-manage-center

# TODO:

## 1. panelServer:接收控制面板传递的指令
- 启动终端（可设置启动时连接指定服务器节点）
- 控制节点
 - 程序管理
 - 关键字、配置文件的设置
 - 日志查看

## 2. nodesServer:接收服务器节点传递的消息
- receive from client：
  - 服务器详情
- send to client：
  - 控制节点

## 3. client:服务器节点
- receive from nodesServer：
  - 控制节点
- send to nodesServer：
  - 服务器详情
