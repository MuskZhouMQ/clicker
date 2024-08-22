# clicker
网站目录
/你的项目文件夹
    /public
        index.html
    server.js

### 第一步
进入网站根目录
```
npm init -y
npm install express socket.io
```
### 第二步
在根目录和/public目录分别上传server.js和index.html

### 第三步
进入网站根目录
```
node server.js
```

### 第四步（附加）使程序在后台持续运行
```
nohup node server.js &
```
查看日志

```
tail -f nohup.out
```
