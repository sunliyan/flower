[https://yangbo5207.github.io/flower/](https://yangbo5207.github.io/flower/)

#### 一 在github上创建项目仓库，命名为flower

#### 二 生成在线地址
github项目页面 -> settings -> 点击按钮Launch automatic page generator -> Continue to layouts -> Publish page
发布之后，在settings页面中的Github Pages中会显示该项目的页面地址
默认的页面代码存放于项目的gh-pages分支上

#### 三 通过git，克隆项目到本地

```js
~ git clone git@github.com:yangbo5207/flower.git

// 在本地创建gh-pages分支
~ git checkout -b gh-pages

// 与远程分支建立track
~ git branch --set-upstream-to=origin/gh-pages gh-pages

// 拉取github上的默认代码
~ git pull
```

#### 四 配置本地开发环境
首先确保本地已经安装了node, npm, git，gulp

创建一个与本项目中一样的gulpfile.js
> 该配置只针对css文件的开发，具体详情请阅读公众号中的文章

创建一个与本项目中一样的package.json

安装配置文件package.json中的gulp模块
```js
~ npm install
```

> [易到用车psd地址](https://yun.baidu.com/share/link?shareid=2739572407&uk=1040742941)
