# Navigation Page

基于 Vue3 构造的简单导航页，支持[零编码](#推荐方案)上线。[演示](https://log-z.github.io/nav)

## 起步

> 零编码时可跳过起步，自动化部署会帮你完成这些操作。

安装依赖
```
npm install
```

运行开发环境
```
npm run serve
```

构建生产环境
```
npm run build
```

单元测试
```
npm run test
```

## 配置
配置和图标文件推荐存放在 GitHub 的 [Gits](https://gist.github.com/) 或代码仓库，因为它们自带跨域支持。
> 当然，你仍可以将它们放置在 `public` 目录下，只要能够被访问到也可。

### 配置文件
这是一个配置文件的示例，使用JSON格式存储。
> 所有的配置项都是可选的，请去除注释后使用。
```javascript
{
    // 配置名称
    "name": "sample",
    // 描述信息，将显示在网页最底部
    "description": "Powered by log-Z",
    // 搜索引擎配置
    "searchEngine": {
        // 需要启用的搜索引擎，暂时只支持这几个
        "list": ["baidu", "google", "bing", "wikipedia"],
        // 输入框占位文本
        "placeholder": "👴来点什么？"
    },
    // 收藏配置
    "favorites": {
        // 图标路径前缀，支持相对路径和绝对路径，这里演示相对路径
        "iconPrefix": "image:wicon:",
        // 收藏组配置，支持多个收藏组
        "groups": [{
            // 收藏组名称，将作为标题显示
            "name": "常用",
            // 站点列表配置
            "websites": [{
                // 站点标题
                "title": "哔哩哔哩",
                // 站点副标题
                "subtitle": "bilibili.com",
                // 站点图标地址，支持相对路径和绝对路径，若忽略则显示站点标题的第一个字
                "icon": "bilibili.svg",
                // 站点地址
                "url": "https://www.bilibili.com/"
            }]
        }]
    }
}
```

### 配置文件地址
在 Gits 中，它提供的 Raw 地址是类似这样的。
```
https://gist.githubusercontent.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10/raw/08d82c7ae57a5572f98caced192366920788c8e0/nav-config-sample.json
```

让我们去掉 `raw/` 之后的 Commit ID 得到最新地址。这样的好处是，无论文件被修改多少次都可以一直使用这个地址。
```
https://gist.githubusercontent.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10/raw/nav-config-sample.json
```

更多细节请参考 [演示配置Gits](https://gist.github.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10) ，代码仓库同理。

### 图标
是的，所有图标都需要你自己维护，这里我为大家准备了一些 [logos](https://github.com/log-Z/logos) 。强烈推荐使用SVG图片以获得最好效果。

> 在 Gits 中，推荐把图标和配置文件放在一起，图标文件名可通过前缀区分开。

更多细节请参考 [演示配置Gits](https://gist.github.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10) ，代码仓库同理。

### 使用配置
在 `.env` 文件中修改 `VUE_APP_DEFAULT_CONFIG_URL` 为自己的配置文件地址。

> 使用自动化部署时，配置文件地址将被重新设定。

## 自动化部署
使用 GitHub 提供的工作流服务，可以自动化部署到 GitHub Pages 或自己的服务器，非常方便。

为了能顺利运行，你需要在自己的代码仓库中配置一下 Actions secrets（位置是 Settings > Security > Secrets > Actions），添加一个 Repository secrets 。
- ENV_DEFAULT_CONFIG_URL：自己的配置文件地址。

我们已经在 `.github/workflows/` 目录下配置了两个工作流，下面依次说明。

### 部署到 GitHub Pages
[github-pages.yml](.github/workflows/github-pages.yml) 无需任何额外配置。

### 部署到服务器
[my-server.yml](.github/workflows/my-server.yml) 还需配置FTP服务器信息。

在代码仓库的 Actions secrets 中配置，额外添加三个 Repository secrets 。
- FTP_HOST：FTP服务器地址
- FTP_USERNAME：FTP用户名
- FTP_PASSWORD：FTP密码

## 推荐方案

### 零编码：GitHub + Gits + GitHub Pages
1. 将此代码仓库 fork 一份到你的账号中，得到独立的环境。
2. 在 Gits 存放[配置信息](#配置)。
3. 使用[自动化部署](#自动化部署)，部署到免费的 GitHub Pages 站点。
4. 后续可在自己的代码仓库中拉取上游更新。