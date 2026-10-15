# 学习当前Script API与GameTest的关系

现在，我们来建立一个可以实际观察运行过程的脚本包。我们的第一个目标很简单：当玩家进入世界并完成生成后，向这位玩家发送一句欢迎信息。

本节使用JavaScript，最低接口基线为`@minecraft/server`的`2.0.0`稳定版本。示例清单将最低引擎版本写为`1.21.90`；实际运行时，仍需要确认所用国际版客户端或BDS提供这一API。本节没有使用实验API，也不需要为了显示欢迎信息而依赖GameTest。

## 先认识两个不同的模块

本教程旧目录将这一部分称为“新版脚本引擎GameTest”。这个名称反映了早期模块化脚本与GameTest一起被介绍时的习惯。现在，我们应将**脚本API**与**游戏测试框架**（**GameTest Framework**）分开认识。

`@minecraft/server`提供世界、玩家、实体、方块和调度等接口，我们可以用它编写玩法。`@minecraft/server-gametest`则提供注册测试、布置测试场地、检查结果等能力，我们可以用它验证玩法。一个正常工作的脚本附加包完全可以不包含任何GameTest；一个GameTest又可以调用世界接口来辅助完成测试。

我们不妨把前者理解为开发时使用的工具，后者理解为检验开发结果的一套设施。这样，在看到`playerSpawn`这样的世界事件时，就不会把它误认为“只有启动GameTest才会触发”的测试事件了。

## 建立最小行为包

我们为本节建立一个新的行为包文件夹，其中放置`manifest.json`和`scripts/main.js`两个文件。对应完整文件位于仓库的`examples/advanced/script_basics/BP`中；不要与后面具有独立清单的示例包合并使用。

首先是`manifest.json`：

```json
{
  "format_version": 2,
  "header": {
    "name": "Tutorial Script Basics",
    "description": "认识脚本加载和玩家生成事件",
    "uuid": "5eaa43e2-bfbc-4284-a90f-cae8bdc70c65",
    "version": [1, 0, 0],
    "min_engine_version": [1, 21, 90]
  },
  "modules": [
    {
      "type": "script",
      "language": "javascript",
      "uuid": "83c2a78e-9d33-47e0-a139-dd4c1349dc67",
      "version": [1, 0, 0],
      "entry": "scripts/main.js"
    }
  ],
  "dependencies": [
    {"module_name": "@minecraft/server", "version": "2.0.0"}
  ]
}
```

`entry`相对于行为包根目录指定入口文件，因此不能写成计算机上的绝对路径。模块依赖使用`module_name`，也不需要为`@minecraft/server`另行编造一个UUID。以后复制此包创建另一个独立作品时，需要为新作品重新生成头部和模块UUID；同一作品的正常升级则应保持身份稳定。

接下来，在`scripts/main.js`中写入：

```javascript
import { world } from "@minecraft/server";

console.warn("[Tutorial] 入口模块已加载。");

world.afterEvents.worldLoad.subscribe(() => {
    console.warn("[Tutorial] 世界已经就绪。");
});

world.afterEvents.playerSpawn.subscribe((event) => {
    if (!event.initialSpawn) return;
    event.player.sendMessage("欢迎来到我们的脚本练习世界！");
});
```

我们先开启内容日志，启用这个行为包，再完整进入测试世界。预期日志能够帮助我们确认入口和世界加载过程，而聊天栏中的欢迎文字则表明玩家生成事件已经触发。这些是大家需要在目标客户端或BDS中执行的验收步骤，仓库内的静态检查不能代替游戏运行。

## 逐步理解这段程序

第一行是JavaScript的模块导入。`world`由游戏提供，代表我们访问世界接口的入口之一。这里没有创建另一份独立世界，也没有连接外部服务器。

接着，我们输出一条日志。这条语句位于模块顶层，加载时便会执行。但是，“能够输出日志”不等于“世界中的所有对象已经可以访问”。因此，示例只在顶层订阅事件，将读取事件中的玩家、发送消息等操作放在对应回调内。

`subscribe`接收一个函数。当事件发生时，游戏调用这个函数，并提供包含相关信息的事件对象。玩家生成事件中的`player`就是本次生成的玩家。我们向该玩家调用`sendMessage`，而不是向整个世界广播，便可以避免一个人进入时其他人也收到相同提示。

`initialSpawn`用来区分此次加入过程中的初次生成与后续重生。我们可以在测试世界中分别尝试重新进入与死亡重生，验证这两个场景。若要记住玩家曾经领取过礼包，则需要下一些章节中的持久状态，单凭这个布尔值还不够。

## 调度与游戏刻

除事件之外，玩法也经常需要延迟执行。我们可以使用`system`提供的调度接口。例如，下面是一个独立片段：

```javascript
import { system } from "@minecraft/server";

const task = system.runInterval(() => {
    console.warn("[Tutorial] 又经过了20个游戏刻。");
}, 20);

system.runTimeout(() => {
    system.clearRun(task);
}, 100);
```

**游戏刻**（**Tick**）是游戏更新的时间单位。正常速度下20刻约为1秒，不过当游戏暂停、服务器负载升高或世界停止运行时，我们不能把游戏刻计数当作精确的现实世界时钟。

`runInterval`返回任务标识，我们可以把它传给`clearRun`停止任务。有限寿命的玩法应当有相应的停止条件，不能每次打开界面或玩家进入时都创建一个永远不清理的循环。在多人世界中，这类重复任务尤其容易使消息和操作成倍出现。

## 从错误中确定问题所在

如果没有入口日志，先检查清单、入口路径和模块版本；如果有入口日志，却没有预期的事件效果，再检查事件选择及条件判断；如果日志报告无法在当前阶段访问世界，则检查是否在顶层提前读取了世界状态。

另外，Node.js与游戏脚本的运行环境并不相同。在编辑器中进行语法检查很有帮助，但Node.js不能直接提供游戏中的`world`对象。我们也不能任意使用`fs`、浏览器DOM或普通网页中的计时器来替代游戏接口。

完成这一节之后，我们便获得了一个清晰的起点：模块负责装入程序，事件负责指出发生了什么，回调负责执行相应逻辑。下一节中，我们再加入GameTest，为一项行为写出明确的成功条件。

## 参考资料

- [官方脚本模块参考](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/minecraft-server?view=minecraft-bedrock-stable)。
- [官方调度接口指南](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/system-run-guide?view=minecraft-bedrock-stable)。
- [BDS导出的2.0.0接口声明](https://github.com/bedrock-apis/bds-docs/blob/stable/types/%40minecraft/server-bindings_2.0.0.d.ts)。
