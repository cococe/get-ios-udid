# get-ios-udid
获取iPhone设备udid
```
npm install
node index.js
```
注意，在启动项目前，将udid.mobileconfig里的`http://127.0.0.1:9000/tools/udid`的域名，改成自己电脑的ip。

iOS设备访问`xxxx:9000/config` 下载描述文件（`xxxx`是你电脑的ip）
描述文件安装成功后，会调用`xxxx:9000/tools/udid`。唤起safari打开`xxxx:9000/show?udid=xxx`，`xxx`就是你设备的`udid`

