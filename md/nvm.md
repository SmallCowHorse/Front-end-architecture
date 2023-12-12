# NVM
## 安装方式
[下载压缩包](https://github.com/nvm-sh/nvm)，控制台目录进入解压后的文件夹中执行命令
```sh
sh install.sh
```

## 常用命令

### 下载最新版本node
```sh
nvm install node
```

### 安装指定版本node
```sh
nvm install <version>
```
安装的第一个版本将成为默认版本。新的 shell 将以默认版本的节点启动（例如，nvm alias default）。

### 卸载指定版本node
```sh
nvm uninstall <version>
```

### 列出所有可下载的node 的版本号
```sh
nvm ls-remote
```

### 查看已安装的node版本
```sh
nvm list
```

### 切换node版本
```sh
nvm use <version>
```

### 设置node默认版本
```sh
nvm alias default <version>
```