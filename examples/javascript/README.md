# JavaScript语言示例验证

本目录配合进阶教程第零章的15节JavaScript基础内容。每节正文的`js`代码块都可以作为一个独立模块运行，示例不需要Minecraft世界或行为包。

在安装了支持这些现代JavaScript语法的Node.js环境中，于仓库根目录执行：

```sh
node examples/javascript/verify.mjs
```

验证程序读取15节正文中的代码块，每次启动独立的模块环境，检查退出状态和实际输出是否与正文中的预期相同。因此不需要维护另一份可能逐渐与正文不同的示例副本。程序也给每个示例设置了执行超时，避免未来误改循环后一直等待。

`verify.mjs`本身使用Node.js的文件与子进程接口，仅供本地验证，不应复制到Minecraft行为包中。通过这些检查说明语言示例能在本次使用的Node.js环境中按预期执行，不等于某一Minecraft版本的全部语法、内置对象或游戏接口已经经过游戏内测试。

初次学习时，也可以把某个正文代码块保存成`example.mjs`，执行`node example.mjs`，然后自行修改输入并比较结果。涉及`this`的例子请保留模块或严格模式的运行条件。

相关内容：[认识JS的语法](../../docs/advanced/sec0.1.md)、[了解异步与承诺](../../docs/advanced/sec0.15.md)。
