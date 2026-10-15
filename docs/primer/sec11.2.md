# 认识Ore UI

在上一节中，我们通过JSON UI为HUD加入了一个标签。不过，当我们尝试用同样的方法修改另外一个界面时，可能会发现原版样本中虽然存在名字相似的文件，游戏却没有使用它。要理解这种现象，我们还需要认识基岩版中的另一套界面技术：**Ore UI**。

## 界面技术与附加包接口

Mojang公开的Ore UI仓库介绍了一组使用Web技术构建游戏界面的基础设施，其中包括React和TypeScript相关技术。**React Facet**则提供了适合高频数据变化的状态管理能力。这里公开的是可复用的界面基础设施，并不是一个把任意网页装入Minecraft的资源包接口。

我们可以用一个相近的例子来理解：知道某个编辑器使用了Qt，不等于这个编辑器就允许用户把任意Qt程序放进插件目录运行。同样，Ore UI采用Web技术，也不意味着在资源包中放入`index.html`、CSS或React组件，游戏就会自动加载。

因此，在选择实现方案之前，我们应先确认目标：是改变现有原版屏幕的外观，还是为自己的玩法提供一个交互菜单？前者依赖该屏幕实际开放的定制入口，后者则可以优先使用公开脚本API。

## 用公开表单完成一个实际目标

我们不妨为实验世界制作一个说明菜单。玩家进入世界后，菜单提供“查看规则”和“查看开发信息”两个选项。这里使用`@minecraft/server-ui`中的**操作表单**（**Action Form**），而不依赖原版菜单内部采用了哪套界面技术。

在已经启用脚本的行为包中，为清单添加与目标游戏版本相容的`@minecraft/server-ui`依赖。本例只使用`2.0.0`中已有的基础接口，同时需要`@minecraft/server`。不要把NPM开发依赖和包清单中的运行时依赖混为一谈。

```json
{
  "module_name": "@minecraft/server-ui",
  "version": "2.0.0"
}
```

下面的代码可以放入脚本入口。`initialSpawn`限制为本次连接中的首次生成，延迟则为客户端完成进入世界留出时间；它不能保证所有设备此时都没有其他界面。

```javascript
import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

async function showTutorialMenu(player) {
  const form = new ActionFormData()
    .title("实验世界")
    .body("欢迎来到我们的附加包实验世界，请选择希望了解的内容。")
    .button("查看规则")
    .button("查看开发信息");

  try {
    const response = await form.show(player);
    if (response.canceled) return;

    if (response.selection === 0) {
      player.sendMessage("本世界用于功能测试，请在副本中进行破坏性实验。");
    } else if (response.selection === 1) {
      player.sendMessage("界面由公开的server-ui表单接口创建。");
    }
  } catch (error) {
    console.warn(`说明菜单未能显示：${error}`);
  }
}

world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.initialSpawn) return;
  system.runTimeout(() => {
    void showTutorialMenu(event.player);
  }, 40);
});
```

表单返回的选项从0开始计数，所以第一个按钮对应0。玩家关闭菜单或客户端当时无法显示菜单，都不能视为选择了第一个按钮。我们先检查`canceled`，再解释`selection`，正是为了保持这个边界。

如果表单未出现，先检查脚本是否加载、依赖是否满足、内容日志是否有异常，再关闭聊天和其他界面重新进入世界。实际作品还可以提供明确的重新打开入口，但不宜在取消后立刻无限重试，使玩家无法正常操作。

## 新的数据驱动界面应当怎样阅读

当前官方资料还介绍了**数据驱动界面**（**Data-Driven UI**，**DDUI**），包括`CustomForm`和可观察值等概念。其核心用途是在表单打开期间更新数据，而不仅仅是在关闭后重新构建表单。

这仍然需要通过已公开的脚本类型、方法和版本约束使用。某个介绍页出现在`stable`视图中，并不足以证明其中所有新类型都已包含在我们选用的模块版本内。我们还应检查具体类页面、模块可用版本，以及与目标游戏构建对应的类型导出。尤其不要将预览版类型声明直接用于正式版包。

本节的基础示例选择已有的`ActionFormData`接口。以后若将它改写为DDUI，应先列出需要的能力，例如打开期间更新任务进度，再核实对应接口的通道和签名。完成这一核对之后，再替换实现会更加稳妥。

## 界面迁移中的实际判断

对于既有JSON UI作品，我们可以建立一张维护表：记录修改的屏幕、具体控件、目标客户端版本、桌面与触屏表现，以及替代方案。若一个屏幕迁移后不再响应原有修改，应当减少对该内部结构的依赖，而不是不断复制旧文件。

如果需求只是提供说明、设置或确认操作，公开表单通常更容易维护；如果需求是一个外观固定的品牌页面，可以在游戏外制作网页；如果需求必须替换某个未开放入口的原版屏幕，就需要明确它超出了本教程普通附加包的实现范围。不能用一个成功运行的独立React演示，充当Minecraft客户端中的实现验证。

## 适用范围与参考

本节区分Ore UI基础设施与创作者接口。基础表单示例不依赖Ore UI内部文件；DDUI的新类型应根据实际模块版本逐项核对。本例尚需在目标客户端完成界面交互验证。

- [Mojang：Ore UI项目说明](https://github.com/Mojang/ore-ui)
- [官方：server-ui模块](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/minecraft-server-ui?view=minecraft-bedrock-stable)
- [官方：ActionFormData](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/actionformdata?view=minecraft-bedrock-stable)
- [官方：DDUI介绍](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/intro-to-ddui?view=minecraft-bedrock-stable)
- [本教程的资料版本与验证边界](../misc/source_guide.md)
