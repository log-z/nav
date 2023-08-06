# Navigation Page

基于 Vue3 构造的简单导航页，支持零编码发布上线。[演示](https://log-z.github.io/nav)

## 起步
### 推荐方案：GitHub + Gits + GitHub Pages
1. 将此代码仓库 fork 一份到你的账号中，得到独立的工作环境。
2. 在 Gits 存放[配置信息](#配置)。
3. 配置好[自动化部署](#自动化部署)，以部署到免费的 GitHub Pages 站点。
4. [启用工作流支持](#启用工作流支持)，第一次运行工作流请[手动触发](#手动运行工作流)。
5. 后续，可在自己的代码仓库中[拉取上游更新](#拉取更新的正确姿势)，工作流将自动运行。`温馨提示这里有小技巧`

### 扩展方案：GitHub + 对象存储 + GitHub Pages
1. 将此代码仓库 fork 一份到你的账号中，得到独立的工作环境。
2. 在对象存储（如阿里云OSS）存放[配置信息](#配置)，请注意开启跨域访问。
3. 配置好[自动化部署](#自动化部署)，以部署到免费的 GitHub Pages 站点。
4. [启用工作流支持](#启用工作流支持)，第一次运行工作流请[手动触发](#手动运行工作流)。
5. 后续，可在自己的代码仓库中[拉取上游更新](#拉取更新的正确姿势)，工作流将自动运行。`温馨提示这里有小技巧`

## 配置
配置和图标文件推荐存放在 GitHub 的 [Gits](https://gist.github.com/) 或代码仓库，因为它们自带跨域支持。
> 当然，你仍可以将它们内嵌到 `public` 目录下，或者使用对象存储（如阿里云OSS），只要能够被访问到也可。

### 主配置文件
这是一个主配置文件的V2版本示例，使用JSON格式存储。
> 兼容性提示：对于没有指定版本号 `version` 的配置文件，将视为V1旧版本进行解析，原有配置项均可正常工作。我们推荐升级到最新版本，以体验更多功能。

> 除了版本号 `version` 之外，所有的配置项都是可选的，请去除注释后使用。
> 
> 主题相关的【4.3.用户自定义】具体用法请参考[主题](#主题)订阅文件的【3.1.2.自定义项】。

```javascript
// config:nav-config-v2.json
{
  // 1. 版本号V2
  "version": "2",
  // 2. 配置名称
  "name": "sample",
  // 3. 描述信息，将显示在网页最底部
  "description": "Powered by log-Z",
  // 4. 主题配置
  "theme": {
    // 4.1. 订阅集合
    "subscribe": {
      // 4.1.1. 订阅（订阅名: 地址），支持相对路径和绝对路径，这里演示相对路径
      "nav": "config:nav-theme-v2.json"
    },
    // 4.2. 选择主题（订阅名.主题名）
    "active": "nav.default",
    // 4.3. 用户自定义
    "custom": {
      "light@primary.color": "#000",
    }
  },
  // 5. 搜索配置
  "search": {
    // 5.1. 搜索框提示文字
    "placeholder": "👴 来点什么？",
    // 5.2. 搜索引擎配置
    "engine": {
      // 5.3. 需要启用的搜索引擎，暂时只支持这几个：
      // 百度、谷歌、必应、求闻百科、维基百科
      "active": ["baidu", "google", "bing", "qiuwenbaike", "wikipedia"]
    }
  },
  // 6. 收藏配置
  "favorites": {
    // 6.1. 图标路径前缀，支持相对路径和绝对路径，这里演示相对路径
    "iconPrefix": "image:wicon:",
    // 6.2. 收藏组配置，支持多个收藏组
    "groups": [{
      // 6.2.1. 收藏组名称，将作为标题显示
      "name": "常用",
      // 6.2.2. 站点列表配置
      "websites": [{
        // 6.2.2.1. 站点标题
        "title": "哔哩哔哩",
        // 6.2.2.2. 站点副标题
        "subtitle": "bilibili.com",
        // 6.2.2.3. 站点图标地址，支持相对路径和绝对路径，若忽略则显示站点标题的第一个字
        "icon": "bilibili.svg",
        // 6.2.2.4. 站点地址
        "url": "https://www.bilibili.com/"
      }]
    }]
  }
}
```

### 配置文件地址
在 Gits 中，它所提供的 Raw 地址是类似这样的。
```
https://gist.githubusercontent.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10/raw/505fb45967a7c8fccc79de9876472894b8b6883a/config:nav-config-v2-sample.json
```

让我们去掉 `raw/` 之后的 Commit ID 得到如下所示的固定地址。这样的好处是，无论文件被修改多少次都可以一直使用这个地址。
```
https://gist.githubusercontent.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10/raw/config:nav-config-v2-sample.json
```

更多细节请参考 [演示配置Gits](https://gist.github.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10#file-config-nav-config-v2-sample-json) ，代码仓库同理。

### 图标
是的，所有图标都需要你自己维护，这里我为大家准备了一些 [logos](https://github.com/log-Z/logos) 。强烈推荐使用SVG图片以获得最好效果。

> 在 Gits 中，推荐把图标和配置文件放在一起，图标文件名可通过前缀区分开。

> 兼容性提示：因 Gits 仅支持纯文本文件，对于 PNG 和 JPG 等其他二进制图片请使用第三方图床或对象存储。[后续计划通过 Base64 编码为 Gits 提供二进制图片支持]

更多细节请参考 [演示配置Gits](https://gist.github.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10#file-config-nav-config-v2-sample-json) ，代码仓库同理。

### 使用配置
在 `.env` 文件中修改 `VITE_DEFAULT_CONFIG_URL` 为自己的配置文件地址。

> 使用自动化部署时，你可以跳过这一步，配置文件地址将被自动设定。

## 自动化部署
使用 GitHub 提供的工作流服务，可以自动化部署到 GitHub Pages 或自己的服务器，非常方便。

为了能顺利运行，你需要在自己的代码仓库中配置一下私人的 Actions secrets（位置是 Settings > Security > Secrets and variables > Actions），添加一个 Repository secrets 。
- ENV_DEFAULT_CONFIG_URL：你自己的配置文件地址。

我们已经在 `.github/workflows/` 目录下配置了两个工作流，下面依次说明。

### 部署到 GitHub Pages
工作流 [deploy-to-github-pages.yml](.github/workflows/deploy-to-github-pages.yml) 无需任何额外配置。

### 部署到 FTP 服务器
工作流 [deploy-to-ftp.yml](.github/workflows/deploy-to-ftp.yml) 还需配置FTP服务器信息。请注意，默认会清空FTP根目录。

在代码仓库的 Actions secrets 中配置FTP服务器信息，额外添加三个 Repository secrets 。
- FTP_HOST：FTP服务器地址
- FTP_USERNAME：FTP用户名
- FTP_PASSWORD：FTP密码

## 进阶

### 主题
主题可以通过订阅的方式分发，一个订阅文件中包含多个主题。下面是订阅文件的V2版本示例，使用JSON格式存储。

> 主题优先级：用户自定义 > 订阅 > 默认值。（用户自定义和订阅都不是必须的）

> 除了版本号 `version` 之外，所有的配置项都是可选的，请去除注释后使用。

```javascript
// config:nav-theme-v2.json
{
  // 1. 版本号V2
  "version": "2",
  // 2. 订阅名称
  "name": "nav",
  // 3. 订阅内容，即主题集合
  "contents": [
    // 3.1. 主题
    {
      // 3.1.1. 主题名
      "name": "default",
      // 3.1.2. 自定义项，暂时只支持这几个
      "custom": {
        // 🌞 亮色
        // 3.1.2.1. 主题色，支持的CSS颜色格式取决于浏览器
        "light@primary.color": "#92bf9a",
        // 3.1.2.2. 基础背景色
        "light@base.background.color": "#fdffe0",
        // 3.1.2.3. 底部背景色
        "light@footer.background.color": "#92bf9a",
        // 3.1.2.4. 高亮背景色
        "light@highlight.background.color": "#edefd1",

        // 🌚 暗色
        // 3.1.2.5. 主题色
        "dark@primary.color": "#478552",
        // 3.1.2.6. 基础背景色
        "dark@base.background.color": "#171717",
        // 3.1.2.7. 底部背景色
        "dark@footer.background.color": "#131313",
        // 3.1.2.8. 高亮背景色
        "dark@highlight.background.color": "rgb(255 255 255 / 5%)"
      }
    }
  ]
}
```

更多细节请参考 [演示配置Gits](https://gist.github.com/log-Z/c5271da181ebb0338ec8d360e1fe7d10#file-config-nav-theme-v2-preset-json) ，代码仓库同理。

### 开发
安装依赖
```
npm install
```

运行开发环境
```
npm run dev
```

构建生产环境
```
npm run build
```

单元测试
```
npm run test
```

## 疑难解答
### 启用工作流支持
默认情况下，新代码仓库的工作流支持处于禁用状态，请到 Actions 中按照提示启用它。

### 手动运行工作流
对于我们提供的两个工作流，仅会在 master 分支更新后自动运行，如需立即运行请手动触发它。

以“[部署到 GitHub Pages](#部署到-github-pages)”工作流为例。进入 Actions 页面，在左侧选择 `Deploy to GitHub Pages` 工作流，然后在右侧点击 `Run workflow` 按钮即可。

### 禁用和启用工作流
对于暂时不需要使用的工作流，可以将其禁用。参考官方文档：[禁用和启用工作流程](https://docs.github.com/cn/actions/managing-workflow-runs/disabling-and-enabling-a-workflow)

### 拉取更新的正确姿势
你已经将此代码仓库 fork 到了自己的账号，那之后又该怎样拉取上游更新呢？

首先，当在自己代码仓库（顶部）中看到类似下面的提示时，请留意是否有 `xxx commits behind` 的字样，这表示上游代码仓库的 master 分支有新变动。简单来说就是：你可以拉取上游更新了。
```
This branch is 2 commits ahead, 4 commits behind log-Z:master.    [ Contribute ] [ Sync fork ]
```

那么，开始拉取上游更新吧！

错误做法：使用 `Sync fork` 直接同步。这会使得“[部署到 GitHub Pages](#部署到-github-pages)”的工作流不能正常工作，因为这种方式并不使用你的 [GITHUB_TOKEN](https://docs.github.com/zh/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) 来操作你的 GitHub Pages ，导致了写入权限的缺失。

正确做法：点击 `xxx commits behind` 的字样超链接，查看变动内容；接着点击 `Create pull request` 按钮去创建一个PR，记得填写标题；最后合并这个PR即可。

> 这是由于工作流被自动触发时，它所使用的身份不一定是你的账号，其实是引起“触发事件”的账号。举个例子，若工作流被声明为推送后触发，那么引起“触发事件”的就是最近一次提交的那个人的账号。

什么？你搞砸了最近一次工作流的运行？当然有办法补救了，去[手动运行](#手动运行工作流)一下工作流吧。不必多说，所使用的身份肯定是你的账号了。
