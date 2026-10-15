# bedrock-addon-tutorial
[![CC by-nc-sa 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]
![issues](https://img.shields.io/github/issues/MiemieMethod/bedrock-addon-tutorial)
![contributors](https://img.shields.io/github/contributors-anon/MiemieMethod/bedrock-addon-tutorial)

Minecraft基岩版附加包教程，包含入门、进阶与登峰三部分。

从[教程首页](docs/README.md)开始阅读，或在[完整目录](docs/CONTENTS.md)中选择章节。复制示例前，请先查看[版本、资料来源与验证范围](docs/misc/source_guide.md)。

配套文件位于[examples](examples/README.md)。每组示例都有自己的安装说明、适用条件和验收步骤；需要由游戏生成的世界存档与结构文件，应按照相应章节实际导出。

## 本地阅读与检查

安装Node.js和Yarn 1后，在仓库根目录运行：

```sh
yarn install --frozen-lockfile
yarn docs:dev
```

生成静态站点使用`yarn docs:build`。使用Python 3运行`python scripts/check_content.py`可以检查正文JSON、示例JSON、导航与本地链接；JavaScript基础章的独立示例可以使用`node examples/javascript/verify.mjs`检查。脚本模块的类型检查步骤见[高级示例说明](examples/advanced/README.md)。站点构建与代码静态检查不能代替Minecraft客户端或BDS中的功能测试，具体区别见[组织可以复现的作品](docs/peak/reproducibility.md)。

## GitHub Pages发布

仓库中的发布工作流在`main`分支更新时执行，也可以从Actions页面手动运行。它先检查正文和示例，再构建VuePress站点，将`docs/.vuepress/dist`作为Pages产物上传，最后完成部署。工作流固定使用Node.js 24.19.0和Yarn 1.22.22，并沿用仓库中的依赖锁文件。

仓库的Settings → Pages → Build and deployment → Source需要选择GitHub Actions，`github-pages`环境也需要允许`main`分支部署。工作流使用GitHub自动提供的令牌，无需另外提供`ACCESS_TOKEN`。历史`gh_pages`分支可以保留，但它不再是这套工作流写入构建产物的位置。

站点基础路径为`/bedrock-addon-tutorial/`。若将教程迁移到其他仓库名或独立域名，应同时检查VuePress的`base`、图标路径和Pages设置。提交成功与部署成功是不同的状态，应在Actions中确认部署步骤完成后，再访问实际站点检查新内容。

[![CC by-nc-sa 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY%20NC%20SA%204.0-lightgrey.svg
