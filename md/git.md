# git

### 将工作区的代码提交到暂存区

git add .

### 添加成为历史版本

git commit -m 'xxx'

### 拉取远程分支最新代码

git pull origin xxx

### 推送代码至远程分支

git push origin xxx

### 合并分支

git merge xxx

### 查看推送日志（倒序排列）

git log

### 切换分支

git checkout xxx

### 查看分支

git branch

### 创建分支

git beanch xxx

### 版本回退

git reset --hard commit_id

### 版本回退快捷指令

git reset --hard HEAD^ 

【注：HEAD是指向当前版本的指针，HEAD^表示上个版本,HEAD^^表示上上个版本】

### 由于本地分支回滚后，版本将落后远程分支，必须使用强制推送覆盖远程分支，否则后面将无法推送到远程分支。

git push -f

### 查看git全局配置

git config --list

### 设置git用户名及邮箱

git config --global user.name "xxx"

git config --global user.email "xxx"

### git 删除本地在远端已经不存在的分支

git remote prune xxx（origin / origin_wangjing）

### 代码暂存到缓存区

git stash

### 从缓存区中取回代码

git stash pop
